import { queryFactory } from './category-topk.summarization';
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

  it('should describe top 3 categories by default.', () => {
    const summaries = getSummaries(queryFactory, points);
    const isTop1stSummary = isTextPartsInSummary('D', '1st', 'sessions');
    const isTop2ndSummary = isTextPartsInSummary('C', '2nd', 'sessions');
    const isTop3rdSummary = isTextPartsInSummary('B', '3rd', 'sessions');

    const top1stSummary = summaries.filter(isTop1stSummary);
    const top2ndSummary = summaries.filter(isTop2ndSummary);
    const top3rdSummary = summaries.filter(isTop3rdSummary);

    expect(summaries.length).toBe(3);

    expect(top1stSummary.length).toBe(1);
    expect(top1stSummary.every(hasHighValidity)).toBeTrue();
    expect(top2ndSummary.length).toBe(1);
    expect(top2ndSummary.every(hasHighValidity)).toBeTrue();
    expect(top3rdSummary.length).toBe(1);
    expect(top3rdSummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe top 4 categories with custom topk.', () => {
    const summaries = getSummaries(pts => queryFactory(pts, { topk: 4 }), points);
    const isTop1stSummary = isTextPartsInSummary('D', '1st', 'sessions');
    const isTop2ndSummary = isTextPartsInSummary('C', '2nd', 'sessions');
    const isTop3rdSummary = isTextPartsInSummary('B', '3rd', 'sessions');
    const isTop4thSummary = isTextPartsInSummary('A', '4th', 'sessions');

    const top1stSummary = summaries.filter(isTop1stSummary);
    const top2ndSummary = summaries.filter(isTop2ndSummary);
    const top3rdSummary = summaries.filter(isTop3rdSummary);
    const top4thSummary = summaries.filter(isTop4thSummary);

    expect(summaries.length).toBe(4);

    expect(top1stSummary.length).toBe(1);
    expect(top1stSummary.every(hasHighValidity)).toBeTrue();
    expect(top2ndSummary.length).toBe(1);
    expect(top2ndSummary.every(hasHighValidity)).toBeTrue();
    expect(top3rdSummary.length).toBe(1);
    expect(top3rdSummary.every(hasHighValidity)).toBeTrue();
    expect(top4thSummary.length).toBe(1);
    expect(top4thSummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe top 3 categories with custom metric.', () => {
    const metric = 'users';
    const summaries = getSummaries(pts => queryFactory(pts, { metric }), points);
    const isTop1stSummary = isTextPartsInSummary('D', '1st', metric);
    const isTop2ndSummary = isTextPartsInSummary('C', '2nd', metric);
    const isTop3rdSummary = isTextPartsInSummary('B', '3rd', metric);

    const top1stSummary = summaries.filter(isTop1stSummary);
    const top2ndSummary = summaries.filter(isTop2ndSummary);
    const top3rdSummary = summaries.filter(isTop3rdSummary);

    expect(summaries.length).toBe(3);

    expect(top1stSummary.length).toBe(1);
    expect(top1stSummary.every(hasHighValidity)).toBeTrue();
    expect(top2ndSummary.length).toBe(1);
    expect(top2ndSummary.every(hasHighValidity)).toBeTrue();
    expect(top3rdSummary.length).toBe(1);
    expect(top3rdSummary.every(hasHighValidity)).toBeTrue();
  });

  it('should describe top 3 categories with percentage.', () => {
    const summaries = getSummaries(pts => queryFactory(pts, { showPercentage: true }), points);
    const isTop1stSummary = isTextPartsInSummary('D', '1st', '%)');
    const isTop2ndSummary = isTextPartsInSummary('C', '2nd', '%)');
    const isTop3rdSummary = isTextPartsInSummary('B', '3rd', '%)');

    const top1stSummary = summaries.filter(isTop1stSummary);
    const top2ndSummary = summaries.filter(isTop2ndSummary);
    const top3rdSummary = summaries.filter(isTop3rdSummary);

    expect(summaries.length).toBe(3);

    expect(top1stSummary.length).toBe(1);
    expect(top1stSummary.every(hasHighValidity)).toBeTrue();
    expect(top2ndSummary.length).toBe(1);
    expect(top2ndSummary.every(hasHighValidity)).toBeTrue();
    expect(top3rdSummary.length).toBe(1);
    expect(top3rdSummary.every(hasHighValidity)).toBeTrue();
  });
});
