import { queryFactory } from './trend-weekly-comparison-average.summarization';
import { TimeSeriesPoint } from '../metas/types';
import { hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('queryFactory', () => {

  it('should have validity value between 0 and 1.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 1; i <= 31; i++) {
      const x = new Date(2020, 6, i);
      const y = i;
      points.push({ x, y });
    }

    const summaries = queryFactory(points)();
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });

  it('should create summaries describing monotonic increasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = i;
      points.push({ x, y });
    }

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'more');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'more');
    const isOtherSummary = norSummaryFilters(
      isFirstWeekSecondWeekSummary,
      isSecondWeekThirdWeekSummary,
    );

    const summaries = queryFactory(points)();
    const firstWeekSecondWeekSummary = summaries.filter(isFirstWeekSecondWeekSummary);
    const secondWeekThirdWeekSummary = summaries.filter(isSecondWeekThirdWeekSummary);
    const otherSummaries = summaries.filter(isOtherSummary);

    expect(firstWeekSecondWeekSummary.length).toBe(1);
    expect(firstWeekSecondWeekSummary.every(hasHighValidity)).toBeTrue();
    expect(secondWeekThirdWeekSummary.length).toBe(1);
    expect(secondWeekThirdWeekSummary.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing constant data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 100;
      points.push({ x, y });
    }

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'similar');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'similar');
    const isOtherSummary = norSummaryFilters(
      isFirstWeekSecondWeekSummary,
      isSecondWeekThirdWeekSummary,
    );

    const summaries = queryFactory(points)();
    const firstWeekSecondWeekSummary = summaries.filter(isFirstWeekSecondWeekSummary);
    const secondWeekThirdWeekSummary = summaries.filter(isSecondWeekThirdWeekSummary);
    const otherSummaries = summaries.filter(isOtherSummary);

    expect(firstWeekSecondWeekSummary.length).toBe(1);
    expect(firstWeekSecondWeekSummary.every(hasHighValidity)).toBeTrue();
    expect(secondWeekThirdWeekSummary.length).toBe(1);
    expect(secondWeekThirdWeekSummary.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing monitonic decreasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 100 - i;
      points.push({ x, y });
    }

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'less');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'less');
    const isOtherSummary = norSummaryFilters(
      isFirstWeekSecondWeekSummary,
      isSecondWeekThirdWeekSummary,
    );

    const summaries = queryFactory(points)();
    const firstWeekSecondWeekSummary = summaries.filter(isFirstWeekSecondWeekSummary);
    const secondWeekThirdWeekSummary = summaries.filter(isSecondWeekThirdWeekSummary);
    const otherSummaries = summaries.filter(isOtherSummary);

    expect(firstWeekSecondWeekSummary.length).toBe(1);
    expect(firstWeekSecondWeekSummary.every(hasHighValidity)).toBeTrue();
    expect(secondWeekThirdWeekSummary.length).toBe(1);
    expect(secondWeekThirdWeekSummary.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing high-low-high data.', () => {
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

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'less');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'more');
    const isOtherSummary = norSummaryFilters(
      isFirstWeekSecondWeekSummary,
      isSecondWeekThirdWeekSummary,
    );

    const summaries = queryFactory(points)();
    const firstWeekSecondWeekSummary = summaries.filter(isFirstWeekSecondWeekSummary);
    const secondWeekThirdWeekSummary = summaries.filter(isSecondWeekThirdWeekSummary);
    const otherSummaries = summaries.filter(isOtherSummary);

    expect(firstWeekSecondWeekSummary.length).toBe(1);
    expect(firstWeekSecondWeekSummary.every(hasHighValidity)).toBeTrue();
    expect(secondWeekThirdWeekSummary.length).toBe(1);
    expect(secondWeekThirdWeekSummary.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });
});

