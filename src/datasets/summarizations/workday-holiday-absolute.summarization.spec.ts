import { queryFactory } from './workday-holiday-absolute.summarization';
import { TimeSeriesPoint } from '../queries/time-series.query';

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

  it('should try all combinations of linguistic variables.', () => {
    const nQuantifierOptions = 3;
    const nDayOptions = 2;
    const nTrafficOptions = 3;
    expect(summaries.length).toBe(nQuantifierOptions * nDayOptions * nTrafficOptions);
  });

  it('should have validity value between 0 and 1.', () => {
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });
});
