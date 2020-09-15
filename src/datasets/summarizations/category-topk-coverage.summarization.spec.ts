import { queryFactory } from './category-topk-coverage.summarization';
import { getSummaries, hasHighValidity, isTextPartsInSummary } from './utils/tests';
import { CategoricalPoint } from '../metas/types';

describe('queryFactory', () => {

  const points: CategoricalPoint[] = [
    { x: 'A', y: 100, },
    { x: 'B', y: 200, },
    { x: 'C', y: 300, },
    { x: 'D', y: 400, },
  ];

  it('should have validity value between 0 and 1.', () => {
    const summaries = getSummaries(queryFactory, points);
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });

  it('should describe top 3 categories coverage by default.', () => {
    const summaries = getSummaries(queryFactory, points);
    const isCoverageSummary = isTextPartsInSummary('top 3', 'countries', 'D, C, B', 'sessions');

    const coverageSummary = summaries.filter(isCoverageSummary);

    expect(summaries.length).toBe(1);

    expect(coverageSummary.length).toBe(1);
    expect(coverageSummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe top 4 categories coverage with custom topk.', () => {
    const summaries = getSummaries(pts => queryFactory(pts, { topk: 4 }), points);
    const isCoverageSummary = isTextPartsInSummary('top 4', 'countries', 'D, C, B, A', 'sessions');

    const coverageSummary = summaries.filter(isCoverageSummary);

    expect(summaries.length).toBe(1);

    expect(coverageSummary.length).toBe(1);
    expect(coverageSummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe top categories coverage when number of categories less than config topk.', () => {
    const summaries = getSummaries(pts => queryFactory(pts, { topk: 10 }), points);
    const isCoverageSummary = isTextPartsInSummary('top 4', 'countries', 'D, C, B, A', 'sessions');

    const coverageSummary = summaries.filter(isCoverageSummary);

    expect(summaries.length).toBe(1);

    expect(coverageSummary.length).toBe(1);
    expect(coverageSummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe top 3 categories coverage with custom xlabel.', () => {
    const summaries = getSummaries(pts => queryFactory(pts, { xlabel: 'devices' }), points);
    const isCoverageSummary = isTextPartsInSummary('top 3', 'devices', 'D, C, B', 'sessions');

    const coverageSummary = summaries.filter(isCoverageSummary);

    expect(summaries.length).toBe(1);

    expect(coverageSummary.length).toBe(1);
    expect(coverageSummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe top 3 categories coverage with custom metric.', () => {
    const summaries = getSummaries(pts => queryFactory(pts, { metric: 'users' }), points);
    const isCoverageSummary = isTextPartsInSummary('top 3', 'countries', 'D, C, B', 'users');

    const coverageSummary = summaries.filter(isCoverageSummary);

    expect(summaries.length).toBe(1);

    expect(coverageSummary.length).toBe(1);
    expect(coverageSummary.every(hasHighValidity)).toBeTrue();
  });
});
