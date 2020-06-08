import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Melody } from '../../models/melody/melody.model';
import { t, tA11y } from '../../assets/i18n';
import { Datum } from '../../d3/xy-chart.d3';
import { formatX, formatY } from '../../utils/formatters';
import { AUDIFICATION } from '../../assets/i18n';

@Component({
  selector: 'app-line-chart-audification',
  templateUrl: './line-chart-audification.component.html',
  styleUrls: ['./line-chart-audification.component.scss'],
})
export class LineChartAudificationComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: Datum[];
  @Input() activeDatum: Datum | null;
  @Output() activeDatumChange = new EventEmitter<Datum | null>();
  @Input() frequencyRange: [number, number] = [256, 2048];
  @Input() duration = 5;
  liveText: string | null = null;
  private melody?: Melody;
  private element = this.elementRef.nativeElement;
  private domain: Date[];
  private range: number[];

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private zone: NgZone,
  ) {
    this.handleSeek = this.handleSeek.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  get INSTRUCTIONS() {
    return t(AUDIFICATION.INSTRUCTIONS);
  }

  get INSTRUCTIONS_A11Y() {
    return tA11y(AUDIFICATION.INSTRUCTIONS);
  }

  ngOnInit() {
    this.element.addEventListener('keydown', this.handleKeyDown);
    this.element.addEventListener('keyup', this.handleKeyUp);
  }

  ngOnDestroy() {
    this.element.removeEventListener('keyup', this.handleKeyUp);
    this.element.removeEventListener('keydown', this.handleKeyDown);
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

  async handleKeyDown($event: KeyboardEvent) {
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
    } else if ('0' <= key && key <= '9') {
      this.melody?.seekTo(this.duration * (+key / 10), true);
    } else {
      return;
    }
    $event.preventDefault();
    $event.stopPropagation();
  }

  handleKeyUp($event: KeyboardEvent) {
    const { key } = $event;
    if (key === ' ') {
      this.melody?.pause();
    } else {
      return;
    }
    $event.preventDefault();
    $event.stopPropagation();
  }

  private readOut(text: string) {
    if (this.liveText === text) {
      this.liveText = null;
      window.setTimeout(() => {
        this.readOut(text);
      }, 500);
    } else {
      this.liveText = text;
    }
  }
}
