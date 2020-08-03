import { queryFactory } from './trend-partial.summarization';
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

  it('should have validity value between 0 and 1.', () => {
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });
});
