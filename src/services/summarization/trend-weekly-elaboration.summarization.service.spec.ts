import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TrendWeeklyElaborationSummarizationService } from './trend-weekly-elaboration.summarization.service';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { testSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('TrendWeeklyElaborationSummarizationService', () => {
  let summarizationDataSourceService: SummarizationDataSourceService;
  let weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService;
  let trendWeeklyElaborationSummarizationService: TrendWeeklyElaborationSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    weekdayWeekendRelativeSummarizationService = new WeekdayWeekendRelativeSummarizationService(
      summarizationDataSourceService
    );
    trendWeeklyElaborationSummarizationService = new TrendWeeklyElaborationSummarizationService(
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
      trendWeeklyElaborationSummarizationService,
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
    // Test on points from July 6 to July 26. It is a 3-week data with the first day being Monday.
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = i * 10;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyElaborationSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('first week', 'Monday to Sunday', 'increased'),
          isTextPartsInSummary('second week', 'Monday to Sunday', 'increased'),
          isTextPartsInSummary('third week', 'Monday to Sunday', 'increased'),
        ];
        const isOtherSummary = norSummaryFilters(...validSummaryFilters);

        const validSummaries = validSummaryFilters.map(summaryFilter =>
          summaries.filter(summaryFilter)
        );
        const otherSummaries = summaries.filter(isOtherSummary);

        for (const validSummary of validSummaries) {
          expect(validSummary.length).toBe(1);
          expect(validSummary.every(hasHighValidity)).toBeTrue();
        }
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing monotonic linearly decreasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    // Test on points from July 6 to July 26. It is a 3-week data with the first day being Monday.
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 1000 - i * 10;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyElaborationSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('first week', 'Monday to Sunday', 'decreased'),
          isTextPartsInSummary('second week', 'Monday to Sunday', 'decreased'),
          isTextPartsInSummary('third week', 'Monday to Sunday', 'decreased'),
        ];
        const isOtherSummary = norSummaryFilters(...validSummaryFilters);

        const validSummaries = validSummaryFilters.map(summaryFilter =>
          summaries.filter(summaryFilter)
        );
        const otherSummaries = summaries.filter(isOtherSummary);

        for (const validSummary of validSummaries) {
          expect(validSummary.length).toBe(1);
          expect(validSummary.every(hasHighValidity)).toBeTrue();
        }
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing data where weekdays are high and weekends are low.', done => {
    const points: TimeSeriesPoint[] = [];
    // Test on points from July 6 to July 26. It is a 3-week data with the first day being Monday.
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = x.getDay() === 6 || x.getDay() === 0 ? 0 : i * 10;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyElaborationSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('first week', 'Monday to Friday', 'increased'),
          isTextPartsInSummary('first week', 'Friday to Saturday', 'decreased'),
          isTextPartsInSummary('second week', 'Monday to Friday', 'increased'),
          isTextPartsInSummary('second week', 'Friday to Saturday', 'decreased'),
          isTextPartsInSummary('third week', 'Monday to Friday', 'increased'),
          isTextPartsInSummary('third week', 'Friday to Saturday', 'decreased'),
        ];
        const isOtherSummary = norSummaryFilters(...validSummaryFilters);

        const validSummaries = validSummaryFilters.map(summaryFilter =>
          summaries.filter(summaryFilter)
        );
        const otherSummaries = summaries.filter(isOtherSummary);

        for (const validSummary of validSummaries) {
          expect(validSummary.length).toBe(1);
          expect(validSummary.every(hasHighValidity)).toBeTrue();
        }
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing data where weekdays are low and weekends are high.', done => {
    const points: TimeSeriesPoint[] = [];
    // Test on points from July 6 to July 26. It is a 3-week data with the first day being Monday.
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = x.getDay() === 6 || x.getDay() === 0 ? 1000 : i * 10;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyElaborationSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('first week', 'Monday to Friday', 'increased'),
          isTextPartsInSummary('first week', 'Friday to Saturday', 'increased'),
          isTextPartsInSummary('second week', 'Monday to Friday', 'increased'),
          isTextPartsInSummary('second week', 'Friday to Saturday', 'increased'),
          isTextPartsInSummary('third week', 'Monday to Friday', 'increased'),
          isTextPartsInSummary('third week', 'Friday to Saturday', 'increased'),
        ];
        const isOtherSummary = norSummaryFilters(...validSummaryFilters);

        const validSummaries = validSummaryFilters.map(summaryFilter =>
          summaries.filter(summaryFilter)
        );
        const otherSummaries = summaries.filter(isOtherSummary);

        for (const validSummary of validSummaries) {
          expect(validSummary.length).toBe(1);
          expect(validSummary.every(hasHighValidity)).toBeTrue();
        }
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });
});

