import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TrendWeeklyElaborationSummarizationService } from './trend-weekly-elaboration.summarization.service';
import { TrendWeeklyComparisonAverageSummarizationService } from './trend-weekly-comparison-average.summarization.service';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { testSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('TrendWeeklyComparisonAverageSummarizationService', () => {

  let summarizationDataSourceService: SummarizationDataSourceService;
  let weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService;
  let trendWeeklyElaborationSummarizationService: TrendWeeklyElaborationSummarizationService;
  let trendWeeklyComparisonAverageSummarizationService: TrendWeeklyComparisonAverageSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    weekdayWeekendRelativeSummarizationService = new WeekdayWeekendRelativeSummarizationService(
      summarizationDataSourceService
    );
    trendWeeklyElaborationSummarizationService = new TrendWeeklyElaborationSummarizationService(
      summarizationDataSourceService,
      weekdayWeekendRelativeSummarizationService,
    );
    trendWeeklyComparisonAverageSummarizationService = new TrendWeeklyComparisonAverageSummarizationService(
      summarizationDataSourceService,
      weekdayWeekendRelativeSummarizationService,
      trendWeeklyElaborationSummarizationService,
    );
  });

  it('should have validity value between 0 and 1.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = i;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonAverageSummarizationService,
      summarizationDataSourceService,
      points,
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

  it('should create summaries describing monotonic increasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = i;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonAverageSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'more');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'more');
        const isOtherSummary = norSummaryFilters(
          isFirstWeekSecondWeekSummary,
          isSecondWeekThirdWeekSummary,
        );

        const firstWeekSecondWeekSummary = summaries.filter(isFirstWeekSecondWeekSummary);
        const secondWeekThirdWeekSummary = summaries.filter(isSecondWeekThirdWeekSummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(firstWeekSecondWeekSummary.length).toBe(1);
        expect(firstWeekSecondWeekSummary.every(hasHighValidity)).toBeTrue();
        expect(secondWeekThirdWeekSummary.length).toBe(1);
        expect(secondWeekThirdWeekSummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should create summaries describing constant data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 100;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonAverageSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'similar');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'similar');
        const isOtherSummary = norSummaryFilters(
          isFirstWeekSecondWeekSummary,
          isSecondWeekThirdWeekSummary,
        );

        const firstWeekSecondWeekSummary = summaries.filter(isFirstWeekSecondWeekSummary);
        const secondWeekThirdWeekSummary = summaries.filter(isSecondWeekThirdWeekSummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(firstWeekSecondWeekSummary.length).toBe(1);
        expect(firstWeekSecondWeekSummary.every(hasHighValidity)).toBeTrue();
        expect(secondWeekThirdWeekSummary.length).toBe(1);
        expect(secondWeekThirdWeekSummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should create summaries describing monitonic decreasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 100 - i;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonAverageSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'less');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'less');
        const isOtherSummary = norSummaryFilters(
          isFirstWeekSecondWeekSummary,
          isSecondWeekThirdWeekSummary,
        );

        const firstWeekSecondWeekSummary = summaries.filter(isFirstWeekSecondWeekSummary);
        const secondWeekThirdWeekSummary = summaries.filter(isSecondWeekThirdWeekSummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(firstWeekSecondWeekSummary.length).toBe(1);
        expect(firstWeekSecondWeekSummary.every(hasHighValidity)).toBeTrue();
        expect(secondWeekThirdWeekSummary.length).toBe(1);
        expect(secondWeekThirdWeekSummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should create summaries describing high-low-high data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      if (i >= 13 && i <= 19) {
        const y = 0;
        points.push({ x, y });
      } else {
        const y = 100;
        points.push({ x, y });
      }
    }

    testSummaries(
      trendWeeklyComparisonAverageSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'less');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'more');
        const isOtherSummary = norSummaryFilters(
          isFirstWeekSecondWeekSummary,
          isSecondWeekThirdWeekSummary,
        );

        const firstWeekSecondWeekSummary = summaries.filter(isFirstWeekSecondWeekSummary);
        const secondWeekThirdWeekSummary = summaries.filter(isSecondWeekThirdWeekSummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(firstWeekSecondWeekSummary.length).toBe(1);
        expect(firstWeekSecondWeekSummary.every(hasHighValidity)).toBeTrue();
        expect(secondWeekThirdWeekSummary.length).toBe(1);
        expect(secondWeekThirdWeekSummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );
  });
});

