import { SummarizationDataSourceService } from './summarization-data-source.service';
import { TrendWeeklyPatternSummarizationService } from './trend-weekly-pattern.summarization.service';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { testSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('queryFactory', () => {

  let summarizationDataSourceService: SummarizationDataSourceService;
  let trendWeeklyPatternSummarizationService: TrendWeeklyPatternSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    trendWeeklyPatternSummarizationService = new TrendWeeklyPatternSummarizationService(
      summarizationDataSourceService,
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
      trendWeeklyPatternSummarizationService,
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
      const y = 200 + 5 * i;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToSundaySummary = isTextPartsInSummary('Monday', 'Sunday', 'similar');
        const isOtherSummary = norSummaryFilters(
          isMondayToSundaySummary,
        );

        const mondayToSundaySummary = summaries.filter(isMondayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToSundaySummary.length).toBe(1);
        expect(mondayToSundaySummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing monotonic decreasing data.', done => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 300 - 5 * i;
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToSundaySummary = isTextPartsInSummary('Monday', 'Sunday', 'similar');
        const isOtherSummary = norSummaryFilters(
          isMondayToSundaySummary,
        );

        const mondayToSundaySummary = summaries.filter(isMondayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToSundaySummary.length).toBe(1);
        expect(mondayToSundaySummary.every(hasHighValidity)).toBeTrue();
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
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToSundaySummary = isTextPartsInSummary('Monday', 'Sunday', 'similar');
        const isOtherSummary = norSummaryFilters(
          isMondayToSundaySummary,
        );

        const mondayToSundaySummary = summaries.filter(isMondayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToSundaySummary.length).toBe(1);
        expect(mondayToSundaySummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should create summaries describing V shape weekly pattern in constant data.', done => {
    const weekPattern = [120, 60, 30, 10, 30, 60, 90];  // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 250 + weekPattern[x.getDay()];
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToWednesdaySummary = isTextPartsInSummary('Monday', 'Wednesday', 'decreased');
        const isWednesdayToSundaySummary = isTextPartsInSummary('Wednesday', 'Sunday', 'increased');
        const isOtherSummary = norSummaryFilters(
          isMondayToWednesdaySummary,
          isWednesdayToSundaySummary,
        );

        const mondayToWednesdaySummary = summaries.filter(isMondayToWednesdaySummary);
        const wednesdayToSundaySummary = summaries.filter(isWednesdayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToWednesdaySummary.length).toBe(1);
        expect(mondayToWednesdaySummary.every(hasHighValidity)).toBeTrue();
        expect(wednesdayToSundaySummary.length).toBe(1);
        expect(wednesdayToSundaySummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing V shape weekly pattern in linearly increasing data.', done => {
    const weekPattern = [120, 60, 30, 10, 30, 60, 90];  // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 200 + i * 5 + weekPattern[x.getDay()];
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToWednesdaySummary = isTextPartsInSummary('Monday', 'Wednesday', 'decreased');
        const isWednesdayToSundaySummary = isTextPartsInSummary('Wednesday', 'Sunday', 'increased');
        const isOtherSummary = norSummaryFilters(
          isMondayToWednesdaySummary,
          isWednesdayToSundaySummary,
        );

        const mondayToWednesdaySummary = summaries.filter(isMondayToWednesdaySummary);
        const wednesdayToSundaySummary = summaries.filter(isWednesdayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToWednesdaySummary.length).toBe(1);
        expect(mondayToWednesdaySummary.every(hasHighValidity)).toBeTrue();
        expect(wednesdayToSundaySummary.length).toBe(1);
        expect(wednesdayToSundaySummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing V shape weekly pattern in linearly decreasing data.', done => {
    const weekPattern = [120, 60, 30, 10, 30, 60, 90];  // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 300 - i * 5 + weekPattern[x.getDay()];
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToWednesdaySummary = isTextPartsInSummary('Monday', 'Wednesday', 'decreased');
        const isWednesdayToSundaySummary = isTextPartsInSummary('Wednesday', 'Sunday', 'increased');
        const isOtherSummary = norSummaryFilters(
          isMondayToWednesdaySummary,
          isWednesdayToSundaySummary,
        );

        const mondayToWednesdaySummary = summaries.filter(isMondayToWednesdaySummary);
        const wednesdayToSundaySummary = summaries.filter(isWednesdayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToWednesdaySummary.length).toBe(1);
        expect(mondayToWednesdaySummary.every(hasHighValidity)).toBeTrue();
        expect(wednesdayToSundaySummary.length).toBe(1);
        expect(wednesdayToSundaySummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing U shape weekly pattern in constant data.', done => {
    const weekPattern = [100, 100, 50, 0, 0, 0, 50];  // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 250 + weekPattern[x.getDay()];
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToWednesdaySummary = isTextPartsInSummary('Monday', 'Wednesday', 'decreased');
        const isWednesdayToFridaySummary = isTextPartsInSummary('Wednesday', 'Friday', 'similar');
        const isFridayToSundaySummary = isTextPartsInSummary('Friday', 'Sunday', 'increased');
        const isOtherSummary = norSummaryFilters(
          isMondayToWednesdaySummary,
          isWednesdayToFridaySummary,
          isFridayToSundaySummary,
        );

        const mondayToWednesdaySummary = summaries.filter(isMondayToWednesdaySummary);
        const wednesdayToFridaySummary = summaries.filter(isWednesdayToFridaySummary);
        const fridayToSundaySummary = summaries.filter(isFridayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToWednesdaySummary.length).toBe(1);
        expect(mondayToWednesdaySummary.every(hasHighValidity)).toBeTrue();
        expect(wednesdayToFridaySummary.length).toBe(1);
        expect(wednesdayToFridaySummary.every(hasHighValidity)).toBeTrue();
        expect(fridayToSundaySummary.length).toBe(1);
        expect(fridayToSundaySummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing U shape weekly pattern in linearly increasing data.', done => {
    const weekPattern = [100, 100, 50, 0, 0, 0, 50];  // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 200 + i * 5 + weekPattern[x.getDay()];
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToWednesdaySummary = isTextPartsInSummary('Monday', 'Wednesday', 'decreased');
        const isWednesdayToFridaySummary = isTextPartsInSummary('Wednesday', 'Friday', 'similar');
        const isFridayToSundaySummary = isTextPartsInSummary('Friday', 'Sunday', 'increased');
        const isOtherSummary = norSummaryFilters(
          isMondayToWednesdaySummary,
          isWednesdayToFridaySummary,
          isFridayToSundaySummary,
        );

        const mondayToWednesdaySummary = summaries.filter(isMondayToWednesdaySummary);
        const wednesdayToFridaySummary = summaries.filter(isWednesdayToFridaySummary);
        const fridayToSundaySummary = summaries.filter(isFridayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToWednesdaySummary.length).toBe(1);
        expect(mondayToWednesdaySummary.every(hasHighValidity)).toBeTrue();
        expect(wednesdayToFridaySummary.length).toBe(1);
        expect(wednesdayToFridaySummary.every(hasHighValidity)).toBeTrue();
        expect(fridayToSundaySummary.length).toBe(1);
        expect(fridayToSundaySummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });

  it('should create summaries describing U shape weekly pattern in linearly decreasing data.', done => {
    const weekPattern = [100, 100, 50, 0, 0, 0, 50];  // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 300 - i * 5 + weekPattern[x.getDay()];
      points.push({ x, y });
    }

    testSummaries(
      trendWeeklyPatternSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isMondayToWednesdaySummary = isTextPartsInSummary('Monday', 'Wednesday', 'decreased');
        const isWednesdayToFridaySummary = isTextPartsInSummary('Wednesday', 'Friday', 'similar');
        const isFridayToSundaySummary = isTextPartsInSummary('Friday', 'Sunday', 'increased');
        const isOtherSummary = norSummaryFilters(
          isMondayToWednesdaySummary,
          isWednesdayToFridaySummary,
          isFridayToSundaySummary,
        );

        const mondayToWednesdaySummary = summaries.filter(isMondayToWednesdaySummary);
        const wednesdayToFridaySummary = summaries.filter(isWednesdayToFridaySummary);
        const fridayToSundaySummary = summaries.filter(isFridayToSundaySummary);
        const otherSummaries = summaries.filter(isOtherSummary);

        expect(mondayToWednesdaySummary.length).toBe(1);
        expect(mondayToWednesdaySummary.every(hasHighValidity)).toBeTrue();
        expect(wednesdayToFridaySummary.length).toBe(1);
        expect(wednesdayToFridaySummary.every(hasHighValidity)).toBeTrue();
        expect(fridayToSundaySummary.length).toBe(1);
        expect(fridayToSundaySummary.every(hasHighValidity)).toBeTrue();
        expect(otherSummaries.every(hasLowValidity)).toBeTrue();

        done();
      },
    );
  });
});

