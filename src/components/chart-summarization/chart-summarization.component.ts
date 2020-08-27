import { Component, Inject, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { SummaryGroup } from '../../datasets/summarizations/types';
import { MatAccordion } from '@angular/material/expansion';
import { map } from 'rxjs/operators';
import { SummarizationControlService } from '../../services/summarization/summarization-control.service';
import { TrendRegressionSummarizationService } from '../../services/summarization/trend-regression.summarization.service';

@Component({
  selector: 'app-summarization',
  templateUrl: './chart-summarization.component.html',
  styleUrls: ['./chart-summarization.component.scss']
})
export class ChartSummarizationComponent implements OnInit {
  // even though change detection doesn't work for dynamically loaded components, leave @Input() to indicate that they will be injected.
  @Input() enabled: boolean;
  @Input() validityThreshold: number;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  summaryGroups: SummaryGroup[] = [];

  constructor(
    @Inject('host') private host: LineChartComponent,
    private summarizationControlService: SummarizationControlService,
    private ts: TrendRegressionSummarizationService,
    private zone: NgZone,
  ) {
  }

  get datum() {
    // TODO: Support multiple legend items summarization
    return this.host.data[0];
  }

  ngOnInit(): void {
    this.host.data$.subscribe(this.summarizationControlService.data$);
    this.summarizationControlService.summaries$(this.host.summarizationMetas)
      .pipe(map(summaryGroups => {
        return summaryGroups.map(sumaryGroup => ({
          ...sumaryGroup,
          summaries: sumaryGroup.summaries
            .filter(({ validity }) => validity >= (this.validityThreshold ?? 0.0))
            .sort(({ validity: va }, { validity: vb }) => vb - va),
        }));
      }))
      .subscribe(summaryGroups => {
        this.summaryGroups = summaryGroups;
      });
  }
}
