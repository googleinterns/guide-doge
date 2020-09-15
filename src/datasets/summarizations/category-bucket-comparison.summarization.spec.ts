import { queryFactory } from './category-bucket-comparison.summarization';
import { getSummaries, hasHighValidity, isTextPartsInSummary } from './utils/tests';
import { CategoricalPoint } from '../metas/types';

fdescribe('queryFactory', () => {

  const points: CategoricalPoint[] = [
    { x: 'A', y: 100, },
    { x: 'B', y: 200, },
    { x: 'C', y: 399, },
    { x: 'D', y: 400, },
  ];

  it('should have validity value between 0 and 1.', () => {
    const summaries = getSummaries(queryFactory, points);
    for (const summary of summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(0.0);
      expect(summary.validity).toBeLessThanOrEqual(1.0);
    }
  });

  it('should describe comparison between buckets.', () => {
    const summaries = getSummaries(queryFactory, points);
    const isDCtoBSummary = isTextPartsInSummary('D, C', 'have', 'more sessions than', 'B');
    const isBtoASummary = isTextPartsInSummary('B', 'has', 'more sessions than', 'A');

    const DCtoBSummary = summaries.filter(isDCtoBSummary);
    const BtoASummary = summaries.filter(isBtoASummary);

    expect(summaries.length).toBe(2);

    expect(DCtoBSummary.length).toBe(1);
    expect(DCtoBSummary.every(hasHighValidity)).toBeTrue();
    expect(BtoASummary.length).toBe(1);
    expect(BtoASummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe comparison between buckets with custom bucket percentage tolerance.', () => {
    const summaries = getSummaries(pts => queryFactory(pts, { bucketPercentageTolerance: 30 }), points);
    const isDCtoBASummary = isTextPartsInSummary('D, C', 'have', 'more sessions than', 'B, A');

    const DCtoBASummary = summaries.filter(isDCtoBASummary);

    expect(summaries.length).toBe(1);

    expect(DCtoBASummary.length).toBe(1);
    expect(DCtoBASummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe comparison between buckets with custom metric.', () => {
    const summaries =  getSummaries(pts => queryFactory(pts, { metric: 'users' }), points);
    const isDCtoBSummary = isTextPartsInSummary('D, C', 'have', 'more users than', 'B');
    const isBtoASummary = isTextPartsInSummary('B', 'has', 'more users than', 'A');

    const DCtoBSummary = summaries.filter(isDCtoBSummary);
    const BtoASummary = summaries.filter(isBtoASummary);

    expect(summaries.length).toBe(2);

    expect(DCtoBSummary.length).toBe(1);
    expect(DCtoBSummary.every(hasHighValidity)).toBeTrue();
    expect(BtoASummary.length).toBe(1);
    expect(BtoASummary.every(hasHighValidity)).toBeTrue();
  });
});
