import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TrendRegressionSummarizationService } from './trend-regression.summarization.service';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { testSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('queryFactory', () => {

  const overallQuicklyIncreasingPoints: TimeSeriesPoint[] = [];
  for (let i = 1; i <= 31; i++) {
    const x = new Date(2020, 6, i);
    const y = i;
    overallQuicklyIncreasingPoints.push({ x, y });
  }

  const weekdayQuicklyIncreasingWeekendConstantPoints: TimeSeriesPoint[] = [];
  for (let i = 1; i <= 31; i++) {
    const x = new Date(2020, 6, i);
    const y = x.getDay() === 0 || x.getDay() === 6 ? 0 : i;
    weekdayQuicklyIncreasingWeekendConstantPoints.push({ x, y });
  }

  let summarizationDataSourceService: SummarizationDataSourceService;
  let weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService;
  let trendRegressionSummarizationService: TrendRegressionSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    weekdayWeekendRelativeSummarizationService = new WeekdayWeekendRelativeSummarizationService(summarizationDataSourceService);
    trendRegressionSummarizationService = new TrendRegressionSummarizationService(
      summarizationDataSourceService,
      weekdayWeekendRelativeSummarizationService,
    );
  });

  it('should return all combinations of subsets and linguistic variables.', done => {

    testSummaries(
      trendRegressionSummarizationService,
      summarizationDataSourceService,
      overallQuicklyIncreasingPoints,
      {},
      summaries => {
        const nTotalSubsets = 3;
        const nTrendDynamicOptions = 5;

        expect(summaries.length).toBe(nTotalSubsets * nTrendDynamicOptions);
        done();
      },
    );
  });

  it('should have validity value between 0 and 1.', done => {

    testSummaries(
      trendRegressionSummarizationService,
      summarizationDataSourceService,
      overallQuicklyIncreasingPoints,
      {},
      summaries => {
        for (const summary of summaries) {
          expect(summary.validity).toBeGreaterThanOrEqual(0.0);
          expect(summary.validity).toBeLessThanOrEqual(1.0);
        }
        done();
      },
    );
  });

  it('should create summaries describing overall linear trend.', done => {

    testSummaries(
      trendRegressionSummarizationService,
      summarizationDataSourceService,
      overallQuicklyIncreasingPoints,
      {},
      summaries => {
        const isOverallQuicklyIncreasingSummary = isTextPartsInSummary('overall', 'linearly quickly increasing');

        const overallQuicklyIncreasingSummaries = summaries.filter(isOverallQuicklyIncreasingSummary);
        const otherSummaries = summaries.filter(s => !isOverallQuicklyIncreasingSummary(s));

        expect(overallQuicklyIncreasingSummaries.length).toBe(1);
        expect(overallQuicklyIncreasingSummaries.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should create summaries describing weekday and weekend linear trends.', done => {

    testSummaries(
      trendRegressionSummarizationService,
      summarizationDataSourceService,
      weekdayQuicklyIncreasingWeekendConstantPoints,
      {},
      summaries => {
        const isWeekdayQuicklyIncreasingSummary = isTextPartsInSummary('weekday', 'linearly quickly increasing');
        const isWeekendConstantSummary = isTextPartsInSummary('weekends', 'similar');
        const isOtherSummary = norSummaryFilters(isWeekdayQuicklyIncreasingSummary, isWeekendConstantSummary);

        const weekdayQuicklyIncreasingSummaries = summaries.filter(isWeekdayQuicklyIncreasingSummary);
        const weekendConstantSummarues = summaries.filter(isWeekendConstantSummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(weekdayQuicklyIncreasingSummaries.length).toBe(1);
        expect(weekdayQuicklyIncreasingSummaries.every(hasHighValidity)).toBeTrue();
        expect(weekendConstantSummarues.length).toBe(1);
        expect(weekendConstantSummarues.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );

  });
});
