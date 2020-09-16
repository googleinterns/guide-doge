import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TrendWeeklyElaborationSummarizationService } from './trend-weekly-elaboration.summarization.service';
import { TrendWeeklyComparisonRateSummarizationService } from './trend-weekly-comparison-rate.summarization.service';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { testSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('queryFactory', () => {

  let summarizationDataSourceService: SummarizationDataSourceService;
  let weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService;
  let trendWeeklyElaborationSummarizationService: TrendWeeklyElaborationSummarizationService;
  let trendWeeklyComparisonRateSummarizationService: TrendWeeklyComparisonRateSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    weekdayWeekendRelativeSummarizationService = new WeekdayWeekendRelativeSummarizationService(
      summarizationDataSourceService
    );
    trendWeeklyElaborationSummarizationService = new TrendWeeklyElaborationSummarizationService(
      summarizationDataSourceService,
      weekdayWeekendRelativeSummarizationService,
    );
    trendWeeklyComparisonRateSummarizationService = new TrendWeeklyComparisonRateSummarizationService(
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
      trendWeeklyComparisonRateSummarizationService,
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

  it('should create summaries describing monotonic linearly increasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = i * 10;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonRateSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'increased', 'in the same rate');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'increased', 'in the same rate');
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

  it('should create summaries describing weekday linearly increasing weekend constant data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = x.getDay() !== 6 && x.getDay() !== 0 ? i * 10 : 0;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonRateSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('weekday', 'second week', 'first week', 'increased', 'in the same rate');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('weekday', 'third week', 'second week', 'increased', 'in the same rate');
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


  it('should create summaries describing monotonic exponentially increasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = i * i;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonRateSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'increased', 'faster');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'increased', 'faster');
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

  it('should create summaries describing monitonic linearly decreasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 1000 - i * 10;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonRateSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'decreased', 'in the same rate');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'decreased', 'in the same rate');
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

  it('should create summaries describing monitonic exponentially decreasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 1000 - i * i;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyComparisonRateSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'decreased', 'faster');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'decreased', 'faster');
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

  it('should create summaries describing N shape data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      if (i >= 13 && i <= 19) {
        const y = 1000 - i * 10;
        points.push({ x, y });
      } else {
        const y = i * 10;
        points.push({ x, y });
      }
    }

    testSummaries(
      trendWeeklyComparisonRateSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'decreasing', 'first week', 'increasing');
        const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'increasing', 'second week', 'decreasing');
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

