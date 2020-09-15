import { queryFactory } from './trend-weekly-elaboration.summarization';
import { TimeSeriesPoint } from '../metas/types';
import { getSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('queryFactory', () => {

  it('should have validity value between 0 and 1.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = i;
      points.push({ x, y });
    }

    const summaries = getSummaries(queryFactory, points);
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });

  it('should create summaries describing monotonic linearly increasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = i * 10;
      points.push({ x, y });
    }

    const validSummaryFilters = [
      isTextPartsInSummary('first week', 'Monday to Sunday', 'increased'),
      isTextPartsInSummary('second week', 'Monday to Sunday', 'increased'),
      isTextPartsInSummary('third week', 'Monday to Sunday', 'increased'),
    ];
    const isOtherSummary = norSummaryFilters(...validSummaryFilters);

    const summaries = getSummaries(queryFactory, points);
    const validSummaries = validSummaryFilters.map(summaryFilter =>
      summaries.filter(summaryFilter)
    );
    const otherSummaries = summaries.filter(isOtherSummary);

    for (const validSummary of validSummaries) {
      expect(validSummary.length).toBe(1);
      expect(validSummary.every(hasHighValidity)).toBeTrue();
    }
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing monotonic linearly decreasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 1000 - i * 10;
      points.push({ x, y });
    }

    const validSummaryFilters = [
      isTextPartsInSummary('first week', 'Monday to Sunday', 'decreased'),
      isTextPartsInSummary('second week', 'Monday to Sunday', 'decreased'),
      isTextPartsInSummary('third week', 'Monday to Sunday', 'decreased'),
    ];
    const isOtherSummary = norSummaryFilters(...validSummaryFilters);

    const summaries = getSummaries(queryFactory, points);
    const validSummaries = validSummaryFilters.map(summaryFilter =>
      summaries.filter(summaryFilter)
    );
    const otherSummaries = summaries.filter(isOtherSummary);

    for (const validSummary of validSummaries) {
      expect(validSummary.length).toBe(1);
      expect(validSummary.every(hasHighValidity)).toBeTrue();
    }
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing weekdays high increasing weekends low data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = x.getDay() === 6 || x.getDay() === 0 ? 0 : i * 10;
      points.push({ x, y });
    }
    const validSummaryFilters = [
      isTextPartsInSummary('first week', 'Monday to Friday', 'increased'),
      isTextPartsInSummary('first week', 'Friday to Saturday', 'decreased'),
      isTextPartsInSummary('second week', 'Monday to Friday', 'increased'),
      isTextPartsInSummary('second week', 'Friday to Saturday', 'decreased'),
      isTextPartsInSummary('third week', 'Monday to Friday', 'increased'),
      isTextPartsInSummary('third week', 'Friday to Saturday', 'decreased'),
    ];
    const isOtherSummary = norSummaryFilters(...validSummaryFilters);

    const summaries = getSummaries(queryFactory, points);
    const validSummaries = validSummaryFilters.map(summaryFilter =>
      summaries.filter(summaryFilter)
    );
    const otherSummaries = summaries.filter(isOtherSummary);

    for (const validSummary of validSummaries) {
      expect(validSummary.length).toBe(1);
      expect(validSummary.every(hasHighValidity)).toBeTrue();
    }
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing weekdays low increasing weekends high data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = x.getDay() === 6 || x.getDay() === 0 ? 1000 : i * 10;
      points.push({ x, y });
    }
    const validSummaryFilters = [
      isTextPartsInSummary('first week', 'Monday to Friday', 'increased'),
      isTextPartsInSummary('first week', 'Friday to Saturday', 'increased'),
      isTextPartsInSummary('second week', 'Monday to Friday', 'increased'),
      isTextPartsInSummary('second week', 'Friday to Saturday', 'increased'),
      isTextPartsInSummary('third week', 'Monday to Friday', 'increased'),
      isTextPartsInSummary('third week', 'Friday to Saturday', 'increased'),
    ];
    const isOtherSummary = norSummaryFilters(...validSummaryFilters);

    const summaries = getSummaries(queryFactory, points);
    const validSummaries = validSummaryFilters.map(summaryFilter =>
      summaries.filter(summaryFilter)
    );
    const otherSummaries = summaries.filter(isOtherSummary);

    for (const validSummary of validSummaries) {
      expect(validSummary.length).toBe(1);
      expect(validSummary.every(hasHighValidity)).toBeTrue();
    }
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });
});

