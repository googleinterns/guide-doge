import { queryFactory } from './workday-holiday-relative.summarization';
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

  it('should return all combinations of linguistic variables.', () => {
    const nQuantifierOptions = 3;
    const nTrafficOptions = 3;
    expect(summaries.length).toBe(nQuantifierOptions * nTrafficOptions);
  });

  it('should have validity value between 0 and 1.', () => {
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });
});
