import { Component, HostBinding, HostListener, Inject, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Melody } from '../../models/melody/melody.model';
import { AUDIFICATION, t, tA11y } from '../../assets/i18n';
import { formatX, formatY, humanizeMeasureName } from '../../utils/formatters';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-line-chart-audification',
  templateUrl: './line-chart-audification.component.html',
  styleUrls: ['./line-chart-audification.component.scss'],
})
export class LineChartAudificationComponent implements OnInit, OnDestroy {
  @Input() frequencyRange: [number, number] = [256, 2048];
  @Input() duration = 5;
  liveText: string | null = null;
  private destroy$ = new Subject();
  private melody?: Melody;
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
    this.host.dataObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => { // TODO: take until destroy
        const values = data.map(datum => datum.value);
        this.domain = data.map(d => d.date).sort((a, b) => a.getTime() - b.getTime());
        this.range = data.map(d => d.value).sort();
        this.melody?.dispose();
        this.melody = new Melody(values, this.frequencyRange, this.duration, this.handleSeek);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.melody?.dispose();
  }

  handleSeek(index, playing) {
    const datum = this.data[index];
    const { date, value } = datum;

    // since Tone.js is running outside of the Angular zone, it needs to reenter the zone to trigger change detection.
    this.zone.run((() => {
      this.activeDatum = datum;
      if (!playing) {
        this.readOut(t(AUDIFICATION.ACTIVE_DATUM, {
          x: formatX(date),
          y: formatY(value),
        }));
      }
    }));
  }

  @HostListener('keydown', ['$event'])
  async handleKeyDown($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    const { key, shiftKey, repeat } = $event;
    if (repeat) {
      return;
    }
    if (key === ' ') {
      await this.melody?.resume(shiftKey);
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
      this.melody?.seekTo(this.duration * (+key / 10), true);
    }
  }

  @HostListener('keyup', ['$event'])
  handleKeyUp($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    const { key } = $event;
    if (key === ' ') {
      this.melody?.pause();
    }
  }

  @HostListener('blur', ['$event'])
  handleBlur() {
    this.melody?.pause();
  }

  private readOut(text: string) {
    if (this.liveText === text) {
      this.liveText = null; // empty the text for a short period of time when the same text needs to be read out consequently
      window.setTimeout(() => {
        this.readOut(text);
      }, 500);
    } else {
      this.liveText = text;
    }
  }
}
