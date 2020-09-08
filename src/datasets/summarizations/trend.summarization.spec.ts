import { queryFactory } from './trend.summarization';
import { getSummaries } from './utils/tests';
import { TimeSeriesPoint } from '../metas/types';

describe('queryFactory', () => {
  const points: TimeSeriesPoint[] = [];
  for (let i = 1; i <= 31; i++) {
    points.push({
      x: new Date(2020, 6, i),
      y: i,
    });
  }
  let summaries;

  beforeEach(() => {
    summaries = getSummaries(queryFactory, points);
  });

  it('should return all combinations of linguistic variables.', () => {
    const nQuantifierOptions = 3;
    const nTrendDynamicOptions = 5;
    expect(summaries.length).toBe(nQuantifierOptions * nTrendDynamicOptions);
  });

  it('should have validity value between 0 and 1.', () => {
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });
});
