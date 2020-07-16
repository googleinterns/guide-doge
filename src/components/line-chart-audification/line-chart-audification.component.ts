import { Component, HostBinding, HostListener, Inject, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Melody } from '../../models/melody/melody.model';
import { AUDIFICATION, t, tA11y } from '../../i18n';
import { formatX, formatY, humanizeMeasureName } from '../../utils/formatters';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AudificationPreference } from '../../services/preference/types';
import { ascendingDate, ascendingNumber } from '../../utils/comparators';
import { ScreenReaderComponent } from '../screen-reader/screen-reader.component';

@Component({
  selector: 'app-line-chart-audification',
  templateUrl: './line-chart-audification.component.html',
  styleUrls: ['./line-chart-audification.component.scss'],
})
export class LineChartAudificationComponent implements AudificationPreference, OnInit, OnDestroy {
  @ViewChild(ScreenReaderComponent, { static: true }) screenReaderComponent: ScreenReaderComponent;

  // even though change detection doesn't work for dynamically loaded components, leave @Input() to indicate that they will be injected.
  @Input() enabled: boolean;
  @Input() lowestPitch: number;
  @Input() highestPitch: number;
  @Input() noteDuration: number;
  @Input() readBefore: boolean;
  @Input() readAfter: boolean;

  melody?: Melody;
  private destroy$ = new Subject();
  private domain: Date[];
  private range: number[];
  @HostBinding('attr.tabindex') private readonly tabindex = 0;
  private resumeTimeoutId: number | null = null;

  constructor(
    @Inject('host') private host: LineChartComponent,
    private zone: NgZone,
  ) {
    this.handleSeek = this.handleSeek.bind(this);
  }

  get INSTRUCTIONS() {
    return t(AUDIFICATION.INSTRUCTIONS);
  }

  get INSTRUCTIONS_A11Y() {
    return tA11y(AUDIFICATION.INSTRUCTIONS);
  }

  get points() {
    return this.host.datum.points;
  }

  get meta() {
    return this.host.meta;
  }

  set activePoint(activePoint) {
    this.host.activePoint = activePoint;
  }

  ngOnInit() {
    this.host.datum$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        const points = data.points;
        const values = points.map(datum => datum.y);
        this.domain = points.map(d => d.x).sort(ascendingDate);
        this.range = points.map(d => d.y).sort(ascendingNumber);
        this.melody?.dispose();
        this.melody = new Melody(values, [this.lowestPitch, this.highestPitch], this.noteDuration, this.handleSeek);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.melody?.dispose();
  }

  handleSeek(index) {
    // since Tone.js is running outside of the Angular zone, it needs to reenter the zone to trigger change detection.
    this.zone.run((() => {
      this.activePoint = this.points[index];
    }));
  }

  @HostListener('keydown', ['$event'])
  async handleKeyDown($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    const { key, shiftKey, repeat } = $event;
    if (!this.melody || repeat) {
      return;
    }
    if (key === ' ') {
      this.resumeMelody(shiftKey);
    } else if (key === 'x') {
      this.readOutDomain();
    } else if (key === 'y') {
      this.readOutRange();
    } else if (key === 'l') {
      this.readOutMeasure();
    } else if ('0' <= key && key <= '9') {
      const seekPercentage = +key * 10;
      const datumIndex = Math.floor(seekPercentage / 100 * this.points.length);
      this.melody.seekTo(datumIndex, true);
      this.readOutCurrentDatum();
    }
  }

  @HostListener('keyup', ['$event'])
  handleKeyUp($event: KeyboardEvent) {
    if (!this.melody) {
      return;
    }
    $event.preventDefault();
    $event.stopPropagation();
    const { key } = $event;
    if (key === ' ') {
      this.pauseMelody();
    }
  }

  @HostListener('blur', ['$event'])
  handleBlur() {
    this.melody?.pause();
  }

  private resumeMelody(reversed: boolean) {
    if (this.readBefore) {
      const delay = this.readOutCurrentDatum();
      const duration = 2000; // an estimated upper bound of how long it would take to read out
      this.resumeTimeoutId = window.setTimeout(async () => {
        this.resumeTimeoutId = null;
        this.melody?.resume(reversed);
      }, delay + duration);
    } else {
      this.melody?.resume(reversed);
    }
  }

  private pauseMelody() {
    if (this.resumeTimeoutId !== null) {
      window.clearTimeout(this.resumeTimeoutId);
      this.resumeTimeoutId = null;
    } else {
      this.melody?.pause();
      if (this.readAfter) {
        this.readOutCurrentDatum();
      }
    }
  }

  private readOutDomain() {
    return this.screenReaderComponent.readOut(t(AUDIFICATION.DOMAIN, {
      min: formatX(this.domain[0]),
      max: formatX(this.domain[this.domain.length - 1]),
    }));
  }

  private readOutRange() {
    return this.screenReaderComponent.readOut(t(AUDIFICATION.RANGE, {
      min: formatY(this.range[0]),
      max: formatY(this.range[this.range.length - 1]),
    }));
  }

  private readOutMeasure() {
    // TODO: read the entire measureNames
    // TODO: read label or legend instead of title
    return this.screenReaderComponent.readOut(humanizeMeasureName(this.meta.title));
  }

  private readOutCurrentDatum() {
    if (!this.melody) {
      return 0;
    }
    const { x, y } = this.points[this.melody.currentDatumIndex];
    return this.screenReaderComponent.readOut(t(AUDIFICATION.ACTIVE_DATUM, {
      x: formatX(x),
      y: formatY(y),
    }));
  }
}
