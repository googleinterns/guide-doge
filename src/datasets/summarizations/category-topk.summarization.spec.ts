import { queryFactory } from './category-topk.summarization';
import { getSummaries } from './utils/tests';
import { CategoricalPoint } from '../metas/types';

describe('queryFactory', () => {
  const hasHighValidity = ({ validity }) => validity >= 0.7;

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
    const isTop1stSummary = ({ text }) => text.includes('weekday') && text.includes('linearly quickly increasing');
    const isTop2ndSummary = ({ text }) => text.includes('weekend') && text.includes('constant');
    const isTop3rdSummary = ({ text }) => text.includes('weekend') && text.includes('constant');

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
