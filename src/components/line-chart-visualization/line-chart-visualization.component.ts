import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { BehaviorSubject } from 'rxjs';
import { Datum, RenderOptions } from '../../d3/xy-chart.d3';

@Component({
  selector: 'app-line-chart-visualization',
  template: '',
  styleUrls: ['./line-chart-visualization.component.scss'],
})
export class LineChartVisualizationComponent implements RenderOptions, OnChanges, OnInit, OnDestroy {
  @Input() height = 500;
  @Input() width = 800;
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;
  @Input() data: Datum[];
  @Input() activeDatum: Datum | null;
  @Output() activeDatumChange = new EventEmitter<Datum | null>();
  private lineChartD3: LineChartD3;

  private dataSubject = new BehaviorSubject<Datum[]>([]);
  dataObservable = this.dataSubject.asObservable();

  private activeDatumSubject = new BehaviorSubject<Datum | null>(null);
  activeDatumObservable = this.activeDatumSubject.asObservable();

  constructor(
    private element: ElementRef<HTMLElement>,
  ) {
    this.lineChartD3 = new LineChartD3(element);
  }

  ngOnInit() {
    this.lineChartD3.init(this);
  }

  ngOnDestroy() {
    this.lineChartD3.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.dataSubject.next(this.data);
    }
    if ('activeDatum' in changes) {
      this.activeDatumSubject.next(this.activeDatum);
    }
  }
}
