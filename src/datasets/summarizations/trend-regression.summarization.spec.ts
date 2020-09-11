import { queryFactory } from './trend-regression.summarization';
import { TimeSeriesPoint } from '../metas/types';
import { hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';

describe('queryFactory', () => {

  const overallQuicklyIncreasingPoints: TimeSeriesPoint[] = [];
  for (let i = 1; i <= 31; i++) {
    const x = new Date(2020, 6, i);
    const y = i;
    overallQuicklyIncreasingPoints.push({ x, y });
  }

  const weekdayQuicklyIncreasingWeekendConstantPoints: TimeSeriesPoint[] = [];
  for (let i = 1; i <= 31; i++) {
    const x = new Date(2020, 6, i);
    const y = x.getDay() === 0 || x.getDay() === 6 ? 0 : i;
    weekdayQuicklyIncreasingWeekendConstantPoints.push({ x, y });
  }

  it('should return all combinations of subsets and linguistic variables.', () => {
    const nTotalSubsets = 3;
    const nTrendDynamicOptions = 5;
    const overallQuicklyIncreasingSummaries = queryFactory(overallQuicklyIncreasingPoints)();
    expect(overallQuicklyIncreasingSummaries.length).toBe(nTotalSubsets * nTrendDynamicOptions);

    const weekdayQuicklyIncreasingWeekendConstantSummaries = queryFactory(weekdayQuicklyIncreasingWeekendConstantPoints)();
    expect(weekdayQuicklyIncreasingWeekendConstantSummaries.length).toBe(nTotalSubsets * nTrendDynamicOptions);
  });

  it('should have validity value between 0 and 1.', () => {
    const overallQuicklyIncreasingSummaries = queryFactory(overallQuicklyIncreasingPoints)();
    for (const summary of overallQuicklyIncreasingSummaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }

    const weekdayQuicklyIncreasingWeekendConstantSummaries = queryFactory(weekdayQuicklyIncreasingWeekendConstantPoints)();
    for (const summary of weekdayQuicklyIncreasingWeekendConstantSummaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });

  it('should create summaries describing overall linear trend.', () => {
    const summaries = queryFactory(overallQuicklyIncreasingPoints)();
    const isOverallQuicklyIncreasingSummary = isTextPartsInSummary('overall', 'linearly quickly increasing');

    const overallQuicklyIncreasingSummaries = summaries.filter(isOverallQuicklyIncreasingSummary);
    const otherSummaries = summaries.filter(s => !isOverallQuicklyIncreasingSummary(s));

    expect(overallQuicklyIncreasingSummaries.length).toBe(1);
    expect(overallQuicklyIncreasingSummaries.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });

  it('should create summaries describing weekday and weekend linear trends.', () => {
    const summaries = queryFactory(weekdayQuicklyIncreasingWeekendConstantPoints)();
    const isWeekdayQuicklyIncreasingSummary = isTextPartsInSummary('weekdays', 'linearly quickly increasing');
    const isWeekendConstantSummary = isTextPartsInSummary('weekends', 'similar');
    const isOtherSummary = norSummaryFilters(isWeekdayQuicklyIncreasingSummary, isWeekendConstantSummary);

    const weekdayQuicklyIncreasingSummaries = summaries.filter(isWeekdayQuicklyIncreasingSummary);
    const weekendConstantSummarues = summaries.filter(isWeekendConstantSummary);
    const otherSummaries = summaries.filter(isOtherSummary);

    expect(weekdayQuicklyIncreasingSummaries.length).toBe(1);
    expect(weekdayQuicklyIncreasingSummaries.every(hasHighValidity)).toBeTrue();
    expect(weekendConstantSummarues.length).toBe(1);
    expect(weekendConstantSummarues.every(hasHighValidity)).toBeTrue();
    expect(otherSummaries.every(hasLowValidity)).toBeTrue();
  });
});
