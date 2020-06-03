import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { LineChartD3 } from '../../d3/line-chart.d3';

@Component({
  selector: 'app-line-chart',
  template: `
    <app-line-chart-audification></app-line-chart-audification>
  `,
})
export class LineChartComponent implements OnChanges {
  @Input() height = 500;
  @Input() width = 800;
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;
  @Input() measureName: string;
  private lineChartD3: LineChartD3;

  constructor(
    private dataService: DataService,
    element: ElementRef,
  ) {
    this.lineChartD3 = new LineChartD3(element);
  }

  get data() {
    return this.dataService.getMeasureOverDays(this.measureName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lineChartD3.apply(this);
  }
}
