import { Observable, of } from 'rxjs';
import { SUMMARIZATION, SummaryGroup } from './types';
import { SummarizationControlService } from './summarization-control.service';
import { SummarizationService, BaseConfig } from './summarization.service';
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

// Just need to implement `summaries$` for testing `SummarizationControlService`.
class TestSummarizationService {
  summaries$(): Observable<SummaryGroup[]> { return of([]); }
}

describe('SummarizationControlService', () => {
  let summarizationControlService: SummarizationControlService;

  let weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService;
  let trendRegressionSummarizationService: TrendRegressionSummarizationService;
  let trendPartialSummarizationService: TrendPartialSummarizationService;
  let trendWeeklyComparisonAverageSummarizationService: TrendWeeklyComparisonAverageSummarizationService;
  let trendWeeklyComparisonRateSummarizationService: TrendWeeklyComparisonRateSummarizationService;
  let trendWeeklyElaborationSummarizationService: TrendWeeklyElaborationSummarizationService;
  let trendWeeklyPatternSummarizationService: TrendWeeklyPatternSummarizationService;
  let categoryTopKSummarizationService: CategoryTopKSummarizationService;
  let categoryTopKCoverageSummarizationService: CategoryTopKCoverageSummarizationService;
  let categoryBucketComparisonSummarizationService: CategoryBucketComparisonSummarizationService;

  beforeEach(() => {
    weekdayWeekendRelativeSummarizationService = new TestSummarizationService() as any;
    trendRegressionSummarizationService = new TestSummarizationService() as any;
    trendPartialSummarizationService = new TestSummarizationService() as any;
    trendWeeklyComparisonAverageSummarizationService = new TestSummarizationService() as any;
    trendWeeklyComparisonRateSummarizationService = new TestSummarizationService() as any;
    trendWeeklyElaborationSummarizationService = new TestSummarizationService() as any;
    trendWeeklyPatternSummarizationService = new TestSummarizationService() as any;
    categoryTopKSummarizationService = new TestSummarizationService() as any;
    categoryTopKCoverageSummarizationService = new TestSummarizationService() as any;
    categoryBucketComparisonSummarizationService = new TestSummarizationService() as any;

    summarizationControlService = new SummarizationControlService(
      weekdayWeekendRelativeSummarizationService,
      trendRegressionSummarizationService,
      trendPartialSummarizationService,
      trendWeeklyComparisonAverageSummarizationService,
      trendWeeklyComparisonRateSummarizationService,
      trendWeeklyElaborationSummarizationService,
      trendWeeklyPatternSummarizationService,
      categoryTopKSummarizationService,
      categoryTopKCoverageSummarizationService,
      categoryBucketComparisonSummarizationService,
    );
  });

  it('should instantiate.', () => {
    expect(summarizationControlService).toBeInstanceOf(SummarizationControlService);
  });

  it('should return summary groups from WeekdayWeekendRelativeSummarizationService.', () => {
    const summarization = SUMMARIZATION.WEEKDAY_WEEKEND_RELATIVE;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(weekdayWeekendRelativeSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(weekdayWeekendRelativeSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from TrendRegressionSummarizationService.', () => {
    const summarization = SUMMARIZATION.TREND_REGRESSION;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(trendRegressionSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(trendRegressionSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from TrendPartialSummarizationService.', () => {
    const summarization = SUMMARIZATION.TREND_PARTIAL;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(trendPartialSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(trendPartialSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from TrendWeeklyComparisonAverageSummarizationService.', () => {
    const summarization = SUMMARIZATION.TREND_WEEKLY_COMPARISON_AVERAGE;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(trendWeeklyComparisonAverageSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(trendWeeklyComparisonAverageSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from TrendWeeklyComparisonRateSummarizationService.', () => {
    const summarization = SUMMARIZATION.TREND_WEEKLY_COMPARISON_RATE;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(trendWeeklyComparisonRateSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(trendWeeklyComparisonRateSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from TrendWeeklyElaborationSummarizationService.', () => {
    const summarization = SUMMARIZATION.TREND_WEEKLY_ELABORATION;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(trendWeeklyElaborationSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(trendWeeklyElaborationSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from TrendWeeklyPatternSummarizationService.', () => {
    const summarization = SUMMARIZATION.TREND_WEEKLY_PATTERN;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(trendWeeklyPatternSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(trendWeeklyPatternSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from CategoryTopKSummarizationService.', () => {
    const summarization = SUMMARIZATION.CATEGORY_TOPK;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(categoryTopKSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(categoryTopKSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from CategoryTopKCoverageSummarizationService.', () => {
    const summarization = SUMMARIZATION.CATEGORY_TOPK_COVERAGE;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(categoryTopKCoverageSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(categoryTopKCoverageSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from CategoryBucketComparisonSummarizationService.', () => {
    const summarization = SUMMARIZATION.CATEGORY_BUCKET_COMPARISON;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    spyOn(categoryBucketComparisonSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(categoryBucketComparisonSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return summary groups from multiple summarization srevices.', () => {
    const summarizations = [
      SUMMARIZATION.TREND_WEEKLY_PATTERN,
      SUMMARIZATION.TREND_WEEKLY_COMPARISON_AVERAGE,
      SUMMARIZATION.TREND_WEEKLY_COMPARISON_RATE,
    ];
    const summarizationMetas = summarizations.map(summarization => ({
      summarization,
      config: { datumLabels: [] },
    }));

    spyOn(trendWeeklyPatternSummarizationService, 'summaries$');
    spyOn(trendWeeklyComparisonAverageSummarizationService, 'summaries$');
    spyOn(trendWeeklyComparisonRateSummarizationService, 'summaries$');

    summarizationControlService.summaries$(summarizationMetas);
    expect(trendWeeklyPatternSummarizationService.summaries$).toHaveBeenCalled();
    expect(trendWeeklyComparisonAverageSummarizationService.summaries$).toHaveBeenCalled();
    expect(trendWeeklyComparisonRateSummarizationService.summaries$).toHaveBeenCalled();
  });

  it('should return empty array when providing invalid summarization.', done => {
    const summarization = 0xFFFF as SUMMARIZATION;
    const summarizationMetas = [{ summarization, config: { datumLabels: [] } }];

    summarizationControlService.summaries$(summarizationMetas).subscribe(summaryGroups => {
      expect(summaryGroups.length).toBe(0);
      done();
    });
  });
});

