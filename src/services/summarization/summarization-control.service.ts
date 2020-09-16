import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map } from 'rxjs/operators';
import { asyncScheduler, ReplaySubject, Subject, Observable, Observer, of, zip } from 'rxjs';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { SummaryGroup, SummarizationMeta, SUMMARIZATION } from './types';
import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TrendRegressionSummarizationService } from './trend-regression.summarization.service';



@Injectable({
  providedIn: 'any',
})
export class SummarizationControlService implements OnDestroy {
  private destroy$ = new Subject();

  constructor(
    private trendRegressionsummarService: TrendRegressionSummarizationService,
    private weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService,
  ) {}

  summaries$(summarizationMetas: SummarizationMeta[]): Observable<SummaryGroup[]> {
    const summariesObservables: Observable<SummaryGroup[]>[] = summarizationMetas.map((meta) => {
      const { summarization, config } = meta;

      switch (summarization) {
        case SUMMARIZATION.WEEKDAY_WEEKEND_RELATIVE:
          return this.weekdayWeekendRelativeSummarizationService.summaries$(config);
        case SUMMARIZATION.TREND_REGRESSION:
          return this.trendRegressionsummarService.summaries$(config);
        default:
          return of([]);
      }
    });
    console.log(summarizationMetas)
    return zip(...summariesObservables)
      .pipe(map(summaryGroups => summaryGroups.flat()))
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
