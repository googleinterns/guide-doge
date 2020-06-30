import { Component, HostBinding, HostListener, Inject, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Melody } from '../../models/melody/melody.model';
import { AUDIFICATION, t, tA11y } from '../../assets/i18n';
import { formatX, formatY, humanizeMeasureName } from '../../utils/formatters';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AudificationPreference } from '../../services/preference/types';
import { ascendingDate, ascendingNumber } from '../../utils/comparators';

@Component({
  selector: 'app-line-chart-audification',
  templateUrl: './line-chart-audification.component.html',
  styleUrls: ['./line-chart-audification.component.scss'],
})
export class LineChartAudificationComponent implements AudificationPreference, OnInit, OnDestroy {
  // even though change detection doesn't work for dynamically loaded components, leave @Input() to indicate that they will be injected.
  @Input() enabled: boolean;
  @Input() lowestPitch: number;
  @Input() highestPitch: number;
  @Input() noteDuration: number;
  @Input() readBefore: boolean;
  @Input() readAfter: boolean;

  liveText: string | null = null;
  private destroy$ = new Subject();
  melody?: Melody;
  private domain: Date[];
  private range: number[];
  @HostBinding('attr.tabindex') private readonly tabindex = 0;
  private readOutTimeoutId: number | null = null;

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

  get data() {
    return this.host.data;
  }

  get measureName() {
    return this.host.measureName;
  }

  set activeDatum(activeDatum) {
    this.host.activeDatum = activeDatum;
  }

  ngOnInit() {
    this.host.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        const values = data.map(datum => datum.value);
        this.domain = data.map(d => d.date).sort(ascendingDate);
        this.range = data.map(d => d.value).sort(ascendingNumber);
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
      this.activeDatum = this.data[index];
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
      await this.melody.resume(shiftKey);
    } else if (key === 'x') {
      this.readOut(t(AUDIFICATION.DOMAIN, {
        min: formatX(this.domain[0]),
        max: formatX(this.domain[this.domain.length - 1]),
      }));
    } else if (key === 'y') {
      this.readOut(t(AUDIFICATION.RANGE, {
        min: formatY(this.range[0]),
        max: formatY(this.range[this.range.length - 1]),
      }));
    } else if (key === 'l') {
      this.readOut(humanizeMeasureName(this.measureName));
    } else if ('0' <= key && key <= '9') {
      const datumIndex = Math.floor(+key / 10 * this.data.length);
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
      this.melody.pause();
      this.readOutCurrentDatum();
    }
  }

  @HostListener('blur', ['$event'])
  handleBlur() {
    this.melody?.pause();
  }

  readOut(text: string) {
    if (this.readOutTimeoutId !== null) {
      window.clearTimeout(this.readOutTimeoutId);
      this.readOutTimeoutId = null;
    }
    if (this.liveText === text) {
      this.liveText = null; // empty the text for a short period of time when the same text needs to be read out consequently
      this.readOutTimeoutId = window.setTimeout(() => {
        this.readOutTimeoutId = null;
        this.readOut(text);
      }, 500);
    } else {
      this.liveText = text;
    }
  }

  private readOutCurrentDatum() {
    if (!this.melody) {
      return;
    }
    const { date, value } = this.data[this.melody.currentDatumIndex];
    this.readOut(t(AUDIFICATION.ACTIVE_DATUM, {
      x: formatX(date),
      y: formatY(value),
    }));
  }
}
