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
  ) {
    if (this.summaryQuery) {
      this.summaries = this.summaryQuery()
        .sort(({ validity: va }, { validity: vb }) => vb - va)
        .filter(({ validity }) => validity >= (this.validityThreshold ?? 0.0));
    } else {
      this.summaries = [];
    }
  }

  get summaryQuery() {
    return this.host.datum.summariesQuery;
  }

  get hasSummaries() {
    return this.summaries && this.summaries.length > 0;
  }

  ngOnInit(): void {
  }

}
