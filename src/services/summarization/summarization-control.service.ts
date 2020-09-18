import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, Observable, of, zip } from 'rxjs';
import { SummaryGroup, SummarizationMeta, SUMMARIZATION } from './types';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TrendRegressionSummarizationService } from './trend-regression.summarization.service';
import { TrendPartialSummarizationService } from './trend-partial.summarization.service';
import { TrendWeeklyComparisonAverageSummarizationService } from './trend-weekly-comparison-average.summarization.service';
import { TrendWeeklyComparisonRateSummarizationService } from './trend-weekly-comparison-rate.summarization.service';
import { TrendWeeklyElaborationSummarizationService } from './trend-weekly-elaboration.summarization.service';
import { TrendWeeklyPatternSummarizationService } from './trend-weekly-pattern.summarization.service';
import { CategoryTopKSummarizationService } from './category-topk.summarization.service';
import { CategoryTopKCoverageSummarizationService } from './category-topk-coverage.summarization.service';
import { CategoryBucketComparisonSummarizationService } from './category-bucket-comparison.summarization.service';

@Injectable({
  providedIn: 'any',
})
export class SummarizationControlService implements OnDestroy {
  private destroy$ = new Subject();

  constructor(
    private weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService,
    private trendRegressionSummarizationService: TrendRegressionSummarizationService,
    private trendPartialSummarizationService: TrendPartialSummarizationService,
    private trendWeeklyComparisonAverageSummarizationService: TrendWeeklyComparisonAverageSummarizationService,
    private trendWeeklyComparisonRateSummarizationService: TrendWeeklyComparisonRateSummarizationService,
    private trendWeeklyElaborationSummarizationService: TrendWeeklyElaborationSummarizationService,
    private trendWeeklyPatternSummarizationService: TrendWeeklyPatternSummarizationService,
    private categoryTopKSummarizationService: CategoryTopKSummarizationService,
    private categoryTopKCoverageSummarizationService: CategoryTopKCoverageSummarizationService,
    private categoryBucketComparisonSummarizationService: CategoryBucketComparisonSummarizationService,
  ) { }

  summaries$(summarizationMetas: SummarizationMeta[]): Observable<SummaryGroup[]> {
    const summariesObservables: Observable<SummaryGroup[]>[] = summarizationMetas.map((meta) => {
      const { summarization, config } = meta;

      switch (summarization) {
        case SUMMARIZATION.WEEKDAY_WEEKEND_RELATIVE:
          return this.weekdayWeekendRelativeSummarizationService.summaries$(config);
        case SUMMARIZATION.TREND_REGRESSION:
          return this.trendRegressionSummarizationService.summaries$(config);
        case SUMMARIZATION.TREND_PARTIAL:
          return this.trendPartialSummarizationService.summaries$(config);
        case SUMMARIZATION.TREND_WEEKLY_COMPARISON_AVERAGE:
          return this.trendWeeklyComparisonAverageSummarizationService.summaries$(config);
        case SUMMARIZATION.TREND_WEEKLY_COMPARISON_RATE:
          return this.trendWeeklyComparisonRateSummarizationService.summaries$(config);
        case SUMMARIZATION.TREND_WEEKLY_ELABORATION:
          return this.trendWeeklyElaborationSummarizationService.summaries$(config);
        case SUMMARIZATION.TREND_WEEKLY_PATTERN:
          return this.trendWeeklyPatternSummarizationService.summaries$(config);
        case SUMMARIZATION.CATEGORY_TOPK:
          return this.categoryTopKSummarizationService.summaries$(config);
        case SUMMARIZATION.CATEGORY_TOPK_COVERAGE:
          return this.categoryTopKCoverageSummarizationService.summaries$(config);
        case SUMMARIZATION.CATEGORY_BUCKET_COMPARISON:
          return this.categoryBucketComparisonSummarizationService.summaries$(config);
        default:
          return of([]);
      }
    });
    return zip(...summariesObservables)
      .pipe(map(summaryGroups => summaryGroups.flat()))
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
