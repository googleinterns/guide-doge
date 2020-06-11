import { Component, EventEmitter, HostListener, Input, NgZone, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Melody } from '../../models/melody/melody.model';
import { AUDIFICATION, t, tA11y } from '../../assets/i18n';
import { Datum } from '../../d3/xy-chart.d3';
import { formatX, formatY, humanizeMeasureName } from '../../utils/formatters';

@Component({
  selector: 'app-line-chart-audification',
  templateUrl: './line-chart-audification.component.html',
  styleUrls: ['./line-chart-audification.component.scss'],
})
export class LineChartAudificationComponent implements OnDestroy, OnChanges {
  @Input() data: Datum[];
  @Input() measureName: string;
  @Input() activeDatum: Datum | null;
  @Output() activeDatumChange = new EventEmitter<Datum | null>();
  @Input() frequencyRange: [number, number] = [256, 2048];
  @Input() duration = 5;
  liveText: string | null = null;
  private melody?: Melody;
  private domain: Date[];
  private range: number[];

  constructor(
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

  ngOnDestroy() {
    this.melody?.dispose();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      const values = this.data.map(datum => datum.value);
      this.domain = this.data.map(d => d.date).sort((a, b) => a.getTime() - b.getTime());
      this.range = this.data.map(d => d.value).sort();
      this.melody?.dispose();
      this.melody = new Melody(values, this.frequencyRange, this.duration, this.handleSeek);
    }
  }

  handleSeek(index, playing) {
    const datum = this.data[index];
    const { date, value } = datum;

    // since Tone.js is running outside of the Angular zone, it needs to reenter the zone to trigger change detection.
    this.zone.run((() => {
      this.activeDatumChange.emit(datum);
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
