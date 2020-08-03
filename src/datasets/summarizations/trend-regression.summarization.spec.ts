import { queryFactory } from './trend-regression.summarization';
import { TimeSeriesPoint } from '../metas/types';

describe('queryFactory', () => {
  const points: TimeSeriesPoint[] = [];
  for (let i = 1; i <= 31; i++) {
    points.push({
      x: new Date(2020, 6, i),
      y: i,
    });
  }
  const querySummaries = queryFactory(points);
  let summaries;

  beforeEach(() => {
    summaries = querySummaries();
  });

  it('should return all combinations of subsets and linguistic variables.', () => {
    const nTotalSubsets = 3;
    const nTrendDynamicOptions = 5;
    expect(summaries.length).toBe(nTotalSubsets * nTrendDynamicOptions);
  });

  it('should have validity value between 0 and 1.', () => {
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });
});
