import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TrendPartialSummarizationService } from './trend-partial.summarization.service';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { testSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('queryFactory', () => {
  let summarizationDataSourceService: SummarizationDataSourceService;
  let weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService;
  let trendPartialSummarizationService: TrendPartialSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    weekdayWeekendRelativeSummarizationService = new WeekdayWeekendRelativeSummarizationService(summarizationDataSourceService);
    trendPartialSummarizationService = new TrendPartialSummarizationService(
      summarizationDataSourceService,
      weekdayWeekendRelativeSummarizationService,
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
      trendPartialSummarizationService,
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
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = i;
      points.push({ x, y });
    }

    testSummaries(
      trendPartialSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstPartSummary = isTextPartsInSummary('July 01', 'July 31', 'increased');
        const isOtherSummary = norSummaryFilters(isFirstPartSummary);

        const firstPartSummaries = summaries.filter(isFirstPartSummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(firstPartSummaries.length).toBe(1);
        expect(firstPartSummaries.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should create summaries describing constant data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = 10;
      points.push({ x, y });
    }

    testSummaries(
      trendPartialSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstPartSummary = isTextPartsInSummary('July 01', 'July 31', 'similar');
        const isOtherSummary = norSummaryFilters(isFirstPartSummary);

        const firstPartSummaries = summaries.filter(isFirstPartSummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(firstPartSummaries.length).toBe(1);
        expect(firstPartSummaries.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );

  });

  it('should create summaries describing V shape data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = i <= 15 ? 15 - i : i - 10;
      points.push({ x, y });
    }

    testSummaries(
      trendPartialSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isFirstPartSummary = isTextPartsInSummary('July 01', 'July 15', 'decreased');
        const isSecondPartSummary = isTextPartsInSummary('July 15', 'July 31', 'increased');
        const isOtherSummary = norSummaryFilters(isFirstPartSummary, isSecondPartSummary);

        const firstPartSummaries = summaries.filter(isFirstPartSummary);
        const secondPartSummaries = summaries.filter(isSecondPartSummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(firstPartSummaries.length).toBe(1);
        expect(firstPartSummaries.every(hasHighValidity)).toBeTrue();
        expect(secondPartSummaries.length).toBe(1);
        expect(secondPartSummaries.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );
  });
});

