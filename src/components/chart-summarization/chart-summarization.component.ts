import { Component, Inject, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { Summary } from '../../datasets/summarizations/types';

@Component({
  selector: 'app-summarization',
  templateUrl: './chart-summarization.component.html',
  styleUrls: ['./chart-summarization.component.scss']
})
export class ChartSummarizationComponent implements OnInit {
  // even though change detection doesn't work for dynamically loaded components, leave @Input() to indicate that they will be injected.
  @Input() enabled: boolean;
  @Input() validityThreshold: number;
  summaries: Summary[];

  constructor(
    @Inject('host') private host: LineChartComponent,
    private zone: NgZone,
  ) { }

  get datum() {
    // TODO: Support multiple legend items summarization
    return this.host.data[0];
  }

  get globalQuerySumaries() {
    return this.host.querySummaries;
  }

  get querySumaries() {
    return this.datum.querySummaries;
  }

  get hasSummaries() {
    return this.summaries && this.summaries.length > 0;
  }

  ngOnInit(): void {
    let summaries: Summary[] = [];
    if (this.querySumaries) {
      summaries = [...summaries, ...this.querySumaries()
        .filter(({ validity }) => validity >= (this.validityThreshold ?? 0.0))];
    }
    if (this.globalQuerySumaries) {
      summaries = [...summaries, ...this.globalQuerySumaries()
        .filter(({ validity }) => validity >= (this.validityThreshold ?? 0.0))];
    }

    summaries.sort(({ validity: va }, { validity: vb }) => vb - va);
    this.summaries = summaries;
  }
}
