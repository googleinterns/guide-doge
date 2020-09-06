import { queryFactory } from './trend-weekly-comparison-rate.summarization';
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

  it('should create summaries describing monotonic linearly increasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = i * 10;
      points.push({ x, y });
    }

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'increased', 'in the same rate');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'increased', 'in the same rate');
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

  it('should create summaries describing weekday linearly increasing weekend constant data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = x.getDay() !== 6 && x.getDay() !== 0 ? i * 10 : 0;
      points.push({ x, y });
    }

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('weekday', 'second week', 'first week', 'increased', 'in the same rate');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('weekday', 'third week', 'second week', 'increased', 'in the same rate');
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


  it('should create summaries describing monotonic exponentially increasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = i * i;
      points.push({ x, y });
    }

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'increased', 'faster');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'increased', 'faster');
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

  it('should create summaries describing monitonic linearly decreasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 1000 - i * 10;
      points.push({ x, y });
    }

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'decreased', 'in the same rate');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'decreased', 'in the same rate');
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

  it('should create summaries describing monitonic exponentially decreasing data.', () => {
    const points: TimeSeriesPoint[] = [];
    for (let i = 6; i <= 26; i++) {
      const x = new Date(2020, 6, i);
      const y = 1000 - i * i;
      points.push({ x, y });
    }

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'first week', 'decreased', 'faster');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'second week', 'decreased', 'faster');
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

  it('should create summaries describing N shape data.', () => {
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

    const isFirstWeekSecondWeekSummary = isTextPartsInSummary('second week', 'decreasing', 'first week', 'increasing');
    const isSecondWeekThirdWeekSummary = isTextPartsInSummary('third week', 'increasing', 'second week', 'decreasing');
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

