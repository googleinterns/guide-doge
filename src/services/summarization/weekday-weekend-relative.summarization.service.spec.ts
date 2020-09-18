import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { testSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';


describe('WeekdayWeekendRelativeSummarizationService', () => {
  let summarizationDataSourceService: SummarizationDataSourceService;
  let weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    weekdayWeekendRelativeSummarizationService = new WeekdayWeekendRelativeSummarizationService(
      summarizationDataSourceService
    );
  });

  it('should return all combinations of linguistic variables.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 28; i++) {
      points.push({
        x: new Date(2020, 6, i),
        y: i,
      });
    }

    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const nQuantifierOptions = 2;
        const nTrafficOptions = 3;
        expect(summaries.length).toBe(nQuantifierOptions * nTrafficOptions);
        done();
      },
    );

  });

  it('should have validity value between 0 and 1.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 28; i++) {
      points.push({
        x: new Date(2020, 6, i),
        y: i,
      });
    }

    testSummaries(
      weekdayWeekendRelativeSummarizationService,
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

  it('should create summaries describing data where weekdays are low and weekends are high.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 28; i++) {
      const x = new Date(2020, 6, i);
      const y = x.getDay() === 6 || x.getDay() === 0 ? 1000 : i * 10;
      points.push({ x, y });
    }

    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('most', 'weekdays', 'active users', 'fewer than', 'weekends'),
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
    for (let i = 1; i <= 28; i++) {
      const x = new Date(2020, 6, i);
      const y = x.getDay() === 6 || x.getDay() === 0 ? 0 : i * 10;
      points.push({ x, y });
    }

    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('most', 'weekdays', 'active users', 'more than', 'weekends'),
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

  it('should create summaries describing constant data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 28; i++) {
      const x = new Date(2020, 6, i);
      const y = 500;
      points.push({ x, y });
    }

    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('most', 'weekdays', 'active users', 'similar to', 'weekends'),
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

  it('should create summaries describing monotonic linearly increasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 28; i++) {
      const x = new Date(2020, 6, i);
      const y = i * 10;
      points.push({ x, y });
    }

    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('most', 'weekdays', 'active users', 'similar to', 'weekends'),
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
    for (let i = 1; i <= 28; i++) {
      const x = new Date(2020, 6, i);
      const y = 1000 - i * 10;
      points.push({ x, y });
    }

    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('most', 'weekdays', 'active users', 'similar to', 'weekends'),
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

  it('should create summaries describing data where half similar, half weekdays are high and weekends are low.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 28; i++) {
      const x = new Date(2020, 6, i);

      if (i <= 16) {
        const y = 0;
        points.push({ x, y });
      } else {
        const y = x.getDay() === 6 || x.getDay() === 0 ? 0 : 100;
        points.push({ x, y });
      }
    }

    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const validSummaryFilters = [
          isTextPartsInSummary('half', 'weekdays', 'active users', 'similar to', 'weekends'),
          isTextPartsInSummary('half', 'weekdays', 'active users', 'more than', 'weekends'),
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
