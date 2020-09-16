import { Component, Inject, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, map, mergeMap } from 'rxjs/operators';
import { MatAccordion } from '@angular/material/expansion';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { SummaryGroup } from '../../datasets/summarizations/types';
import { SummarizationControlService } from '../../services/summarization/summarization-control.service';
import { SummarizationDataSourceService } from '../../services/summarization/summarization-data-source.service';
@Component({
  selector: 'app-summarization',
  templateUrl: './chart-summarization.component.html',
  styleUrls: ['./chart-summarization.component.scss']
})
export class ChartSummarizationComponent implements OnInit, OnDestroy {
  // even though change detection doesn't work for dynamically loaded components, leave @Input() to indicate that they will be injected.
  @Input() enabled: boolean;
  @Input() validityThreshold: number;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  summaryGroups: SummaryGroup[];
  private destroy$ = new Subject();

  constructor(
    @Inject('host') private host: LineChartComponent,
    private summarizationControlService: SummarizationControlService,
    private summarizationDataSourceService: SummarizationDataSourceService,
    private zone: NgZone,
  ) { }

  get datum() {
    // TODO: Support multiple legend items summarization
    return this.host.data[0];
  }

  ngOnInit(): void {
    this.host.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.summarizationDataSourceService.data$);
    this.host.summarizationMetas$
      .pipe(takeUntil(this.destroy$))
      .pipe(map(summarizationMetas => this.summarizationControlService.summaries$(summarizationMetas)))
      .pipe(mergeMap(summaryGroups$ => summaryGroups$))
      .subscribe(summaryGroups => {
        this.summaryGroups = summaryGroups.map(sumaryGroup => ({
          ...sumaryGroup,
          summaries: sumaryGroup.summaries
            .filter(({ validity }) => validity >= (this.validityThreshold ?? 0.0))
            .sort(({ validity: va }, { validity: vb }) => vb - va),
        }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
