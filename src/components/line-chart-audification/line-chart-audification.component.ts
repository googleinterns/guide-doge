import { Component, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { AudificationService } from '../../services/audification/audification.service';
import * as Tone from 'tone';
import { Subscription } from 'rxjs';
import { Datum } from '../../d3/xy-chart.d3';

@Component({
  selector: 'app-line-chart-audification',
  templateUrl: './line-chart-audification.component.html',
})
export class LineChartAudificationComponent implements OnInit, OnDestroy {
  @Input() frequencyRange: [number, number] = [256, 2048];
  @Input() duration = 5;
  private element = this.component.element.nativeElement;
  private forwardSequence?: Tone.Sequence;
  private backwardSequence?: Tone.Sequence;
  private dataSubscription?: Subscription = new Subscription();
  private data: Datum[];
  private currentIndex = 0;
  private inclusive = true;
  private reversed = false;

  constructor(
    @Host() public component: LineChartComponent,
    private audificationService: AudificationService,
  ) {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  get noteDuration() {
    return 1 / this.data.length * this.duration;
  }

  get currentSeconds() {
    return this.reversed ? this.duration - Tone.Transport.seconds : Tone.Transport.seconds;
  }

  ngOnInit() {
    this.dataSubscription = this.component.dataObservable.subscribe(data => {
      this.data = data;
      const values = data.map(datum => datum.value);
      const reversedValues = [...values].reverse();
      this.forwardSequence?.dispose();
      this.backwardSequence?.dispose();
      const noteCallback = () => {
        this.seekTo(this.currentSeconds);
      };
      this.forwardSequence = this.audificationService.audify(values, this.frequencyRange, this.duration, noteCallback);
      this.backwardSequence = this.audificationService.audify(reversedValues, this.frequencyRange, this.duration, noteCallback);
    });
    this.element.addEventListener('keydown', this.handleKeyDown);
    this.element.addEventListener('keyup', this.handleKeyUp);
  }

  ngOnDestroy() {
    this.element.removeEventListener('keyup', this.handleKeyUp);
    this.element.removeEventListener('keydown', this.handleKeyDown);
    this.dataSubscription?.unsubscribe();
    this.forwardSequence?.dispose();
    this.backwardSequence?.dispose();
  }

  async resumeMelody(reversed: boolean) {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    this.reversed = reversed;
    const offset = this.inclusive ? 0 : this.reversed ? -1 : +1;
    let nextSeconds = this.getSeconds(this.currentIndex + offset);
    if (this.reversed) {
      this.backwardSequence?.start(0);
      this.forwardSequence?.stop(0);
      nextSeconds += this.noteDuration / 2;
      Tone.Transport.start(undefined, this.duration - nextSeconds);
    } else {
      this.backwardSequence?.stop(0);
      this.forwardSequence?.start(0);
      nextSeconds -= this.noteDuration / 2;
      Tone.Transport.start(undefined, nextSeconds);
    }
  }

  pauseMelody() {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.pause();
      const currentSeconds = this.reversed ? this.duration - Tone.Transport.seconds : Tone.Transport.seconds;
      this.seekTo(currentSeconds);
    }
  }

  async handleKeyDown($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    const { key, shiftKey, repeat } = $event;
    if (repeat) {
      return;
    }
    if (key === ' ') {
      await this.resumeMelody(shiftKey);
    } else if ('0' <= key && key <= '9') {
      this.seekTo(this.duration * (+key / 10), true);
    }
  }

  handleKeyUp($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.pauseMelody();
  }

  private seekTo(seconds: number, inclusive = false) {
    let index = this.getDatumIndex(seconds);
    this.component.activeDatum = this.data[index] ?? null;
    if (this.reversed && index === 0) {
      index--;
    } else if (!this.reversed && index === this.data.length - 1) {
      index++;
    }
    this.currentIndex = index;
    this.inclusive = inclusive;
  }

  private getSeconds(index: number) {
    return (index + .5) * this.noteDuration;
  }

  private getDatumIndex(seconds: number) {
    const index = Math.round(seconds / this.noteDuration - .5);
    return Math.min(Math.max(index, 0), this.data.length - 1);
  }
}
