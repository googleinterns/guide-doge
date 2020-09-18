import { SummarizationDataSourceService } from './summarization-data-source.service';
import { CategoryTopKSummarizationService } from './category-topk.summarization.service';
import { testSummaries, hasHighValidity, isTextPartsInSummary } from './utils/tests';
import { CategoricalPoint } from '../../datasets/metas/types';

describe('CategoryTopKSummarizationService', () => {
  const points: CategoricalPoint[] = [
    { x: 'A', y: 100, },
    { x: 'B', y: 200, },
    { x: 'C', y: 300, },
    { x: 'D', y: 400, },
  ];

  let summarizationDataSourceService: SummarizationDataSourceService;
  let categoryTopKSummarizationService: CategoryTopKSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    categoryTopKSummarizationService = new CategoryTopKSummarizationService(
      summarizationDataSourceService,
    );
  });

  it('should have validity value between 0 and 1.', done => {

    testSummaries(
      categoryTopKSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        for (const summary of summaries) {
          expect(summary.validity).toBeGreaterThanOrEqual(0.0);
          expect(summary.validity).toBeLessThanOrEqual(1.0);
        }
        done();
      },
    );
  });

  it('should describe top 3 categories by default.', done => {

    testSummaries(
      categoryTopKSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
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
        done();
      },
    );
  });

  it('should describe top 4 categories with custom topk.', done => {

    testSummaries(
      categoryTopKSummarizationService,
      summarizationDataSourceService,
      points,
      { topk: 4 },
      summaries => {
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
        done();
      },
    );
  });

  it('should describe top 3 categories with custom metric.', done => {

    const metric = 'users';
    testSummaries(
      categoryTopKSummarizationService,
      summarizationDataSourceService,
      points,
      { metric },
      summaries => {
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
        done();
      },
    );
  });

  it('should describe top 3 categories with percentage.', done => {

    testSummaries(
      categoryTopKSummarizationService,
      summarizationDataSourceService,
      points,
      { showPercentage: true },
      summaries => {
        const isTop1stSummary = isTextPartsInSummary('D', '1st', '40%)');
        const isTop2ndSummary = isTextPartsInSummary('C', '2nd', '30%)');
        const isTop3rdSummary = isTextPartsInSummary('B', '3rd', '20%)');

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
        done();
      },
    );
  });
});
