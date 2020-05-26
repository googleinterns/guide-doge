import { Component, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { Subscription } from 'rxjs';
import { Melody } from '../../models/melody/melody.model';

@Component({
  selector: 'app-line-chart-audification',
  templateUrl: './line-chart-audification.component.html',
})
export class LineChartAudificationComponent implements OnInit, OnDestroy {
  @Input() frequencyRange: [number, number] = [256, 2048];
  @Input() duration = 5;
  private element = this.component.element.nativeElement;
  private lineChartD3 = this.component.lineChartD3;
  private melody?: Melody;
  private dataSubscription?: Subscription;
  private refocusTimeout?: number;

  constructor(
    @Host() public component: LineChartComponent,
  ) {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  ngOnInit() {
    this.dataSubscription = this.component.dataObservable.subscribe(data => {
      const values = data.map(datum => datum.value);
      this.melody?.dispose();
      this.melody = new Melody(values, this.frequencyRange, this.duration, (index, playing) => {
        this.component.activeDatum = data[index];
        if (!playing) {
          this.readOut(this.lineChartD3.activeGroupId);
        }
      });
    });
    this.element.addEventListener('keydown', this.handleKeyDown);
    this.element.addEventListener('keyup', this.handleKeyUp);
  }

  ngOnDestroy() {
    this.element.removeEventListener('keyup', this.handleKeyUp);
    this.element.removeEventListener('keydown', this.handleKeyDown);
    this.dataSubscription?.unsubscribe();
    this.melody?.dispose();
    if (this.refocusTimeout !== undefined) {
      window.clearTimeout(this.refocusTimeout);
    }
  }

  async handleKeyDown($event: KeyboardEvent) {
    const { key, shiftKey, repeat } = $event;
    if (repeat) {
      return;
    }
    if (key === ' ') {
      await this.melody?.resume(shiftKey);
    } else if (key === 'x') {
      this.readOut(this.lineChartD3.xAxisId);
    } else if (key === 'y') {
      this.readOut(this.lineChartD3.yAxisId);
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

  private readOut(id: string, refocus = true) {
    if (refocus) {
      this.element.focus();
      if (this.refocusTimeout !== undefined) {
        window.clearTimeout(this.refocusTimeout);
      }
      this.refocusTimeout = window.setTimeout(() => {
        this.refocusTimeout = undefined;
        this.readOut(id, false);
      }, 500);
    } else {
      document.getElementById(id)?.focus();
    }
  }
}
