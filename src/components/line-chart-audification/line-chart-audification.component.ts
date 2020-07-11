import { Component, HostBinding, HostListener, Inject, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Melody } from '../../models/melody/melody.model';
import { formatX, formatY } from '../../utils/formatters';
import { AUDIFICATION, t, tA11y } from '../../i18n';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { AudificationPreference } from '../../services/preference/types';
import { ascendingDate, ascendingNumber } from '../../utils/comparators';
import { ScreenReaderComponent } from '../screen-reader/screen-reader.component';
import { mod } from '../../utils/misc';

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
  private datumIndex$ = new BehaviorSubject(0);
  private domain: Date[];
  private range: number[];
  @HostBinding('attr.tabindex') private readonly tabindex = 0;

  constructor(
    @Inject('host') private host: LineChartComponent,
    private zone: NgZone,
  ) {
    this.handleSeek = this.handleSeek.bind(this);
  }

  get INSTRUCTIONS() {
    return t(AUDIFICATION.INSTRUCTIONS);
  }

  get data() {
    return this.host.data;
  }

  get datumIndex() {
    return this.datumIndex$.value;
  }

  set datumIndex(datumIndex) {
    this.datumIndex$.next(datumIndex);
  }

  get points() {
    return this.data[this.datumIndex].points;
  }

  get meta() {
    return this.host.meta;
  }

  set activePoint(activePoint) {
    this.host.activePoint = activePoint;
  }

  private get i18nDomainArgs() {
    return {
      domain_min: formatX(this.domain[0]),
      domain_max: formatX(this.domain[this.domain.length - 1]),
      domain_unit: t(AUDIFICATION.DOMAIN_UNIT_DAY),
    };
  }

  private get i18nRangeArgs() {
    return {
      range_min: formatY(this.range[0]),
      range_max: formatY(this.range[this.range.length - 1]),
    };
  }

  ngOnInit() {
    combineLatest([
      this.host.data$,
      this.datumIndex$,
    ]).pipe(takeUntil(this.destroy$))
      .subscribe(([data, datumIndex]) => {
        const { points } = data[datumIndex];
        const values = points.map(datum => datum.y);
        this.domain = points.map(d => d.x).sort(ascendingDate);
        this.range = [...values].sort(ascendingNumber);
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
    const { key, shiftKey, repeat, altKey, ctrlKey, metaKey } = $event;
    if (!this.melody || altKey || ctrlKey || metaKey) {
      return;
    }
    if (!repeat) {
      if (key === ' ') {
        this.resumeMelody(shiftKey);
      } else if (key === 'x') {
        this.readOutDomain();
      } else if (key === 'y') {
        this.readOutRange();
      } else if (key === 'l') {
        this.readOutLegendItems();
      } else if ('0' <= key && key <= '9') {
        const pointIndex = Math.floor(+key / 10 * this.points.length);
        this.melody.seekTo(pointIndex, true);
        this.readOutCurrentDatum();
      } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        const delta = key === 'ArrowUp' ? +1 : -1;
        const { pointIndex } = this.melody;
        this.datumIndex = mod(this.datumIndex + delta, this.data.length);
        this.melody.seekTo(pointIndex, true);
        this.readOutCurrentLegendItem();
      } else if (key === '?') {
        this.readOutInstructions();
      } else {
        return;
      }
    }
    $event.preventDefault();
    $event.stopPropagation();
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

  @HostListener('focus', ['$event'])
  handleFocus() {
    return this.readOutCurrentLegendItem();
  }

  @HostListener('blur', ['$event'])
  handleBlur() {
    this.melody?.pause();
  }

  private async resumeMelody(reversed: boolean) {
    if (!this.melody) {
      return false;
    }
    await this.melody.prepare();
    if (this.readBefore) {
      const waited = await this.readOutCurrentDatum();
      if (!waited) {
        return false;
      }
    }
    return this.melody.resume(reversed);
  }

  private async pauseMelody() {
    this.screenReaderComponent.cancel();
    this.melody?.pause();
    if (this.readAfter) {
      return this.readOutCurrentDatum();
    }
    return true;
  }

  private readOutDomain() {
    return this.screenReaderComponent.readOut(t(AUDIFICATION.DOMAIN, this.i18nDomainArgs));
  }

  private async readOutRange() {
    if (!this.melody) {
      return false;
    }
    await this.melody.prepare();
    await this.melody.informFrequencyRange();
    return this.screenReaderComponent.readOut(t(AUDIFICATION.RANGE, this.i18nRangeArgs));
  }

  private readOutCurrentLegendItem() {
    return this.screenReaderComponent.readOut(tA11y(AUDIFICATION.CURRENT_LEGEND_ITEM, {
      label: this.data[this.datumIndex].label,
      ...this.i18nDomainArgs,
      ...this.i18nRangeArgs,
    }));
  }

  private readOutLegendItems() {
    const labels = this.data.map(item => item.label);
    const { datumIndex } = this;
    const reorderedLabels = [...labels, ...labels].slice(datumIndex, datumIndex + labels.length);
    return this.screenReaderComponent.readOut(reorderedLabels.join(', '));
  }

  private async readOutCurrentDatum() {
    if (!this.melody) {
      return false;
    }
    const { x, y } = this.points[this.melody.pointIndex];
    return this.screenReaderComponent.readOut(t(AUDIFICATION.ACTIVE_POINT, {
      x: formatX(x),
      y: formatY(y),
    }));
  }

  private readOutInstructions() {
    return this.screenReaderComponent.readOut(tA11y(AUDIFICATION.INSTRUCTIONS));
  }
}
