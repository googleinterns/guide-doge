import { queryFactory } from './trend-partial.summarization';
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

  it('should create summaries describing monotonic increasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = i;
      points.push({ x, y });
    }

    const isFirstPartSummary = isTextPartsInSummary('July 01', 'July 31', 'increased');
    const isOtherSummary = norSummaryFilters(isFirstPartSummary);

    const summaries = getSummaries(queryFactory, points);
    const firstPartSummaries = summaries.filter(isFirstPartSummary);
    const otherSummaries = summaries.filter(isOtherSummary);

    expect(firstPartSummaries.length).toBe(1);
    expect(firstPartSummaries.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing constant data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = 10;
      points.push({ x, y });
    }

    const isFirstPartSummary = isTextPartsInSummary('July 01', 'July 31', 'similar');
    const isOtherSummary = norSummaryFilters(isFirstPartSummary);

    const summaries = getSummaries(queryFactory, points);
    const firstPartSummaries = summaries.filter(isFirstPartSummary);
    const otherSummaries = summaries.filter(isOtherSummary);

    expect(firstPartSummaries.length).toBe(1);
    expect(firstPartSummaries.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing V shape data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = i <= 15 ? 15 - i : i - 10;
      points.push({ x, y });
    }

    const isFirstPartSummary = isTextPartsInSummary('July 01', 'July 15', 'decreased');
    const isSecondPartSummary = isTextPartsInSummary('July 15', 'July 31', 'increased');
    const isOtherSummary = norSummaryFilters(isFirstPartSummary, isSecondPartSummary);

    const summaries = getSummaries(queryFactory, points);
    const firstPartSummaries = summaries.filter(isFirstPartSummary);
    const secondPartSummaries = summaries.filter(isSecondPartSummary);
    const otherSummaries = summaries.filter(isOtherSummary);

    expect(firstPartSummaries.length).toBe(1);
    expect(firstPartSummaries.every(hasHighValidity)).toBeTrue();
    expect(secondPartSummaries.length).toBe(1);
    expect(secondPartSummaries.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });
});

