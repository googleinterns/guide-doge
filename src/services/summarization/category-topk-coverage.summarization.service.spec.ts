import { SummarizationDataSourceService } from './summarization-data-source.service';
import { CategoryTopKCoverageSummarizationService } from './category-topk-coverage.summarization.service';
import { testSummaries, hasHighValidity, isTextPartsInSummary } from './utils/tests';
import { CategoricalPoint } from '../../datasets/metas/types';

describe('CategoryTopKCoverageSummarizationService', () => {

  const points: CategoricalPoint[] = [
    { x: 'A', y: 100, },
    { x: 'B', y: 200, },
    { x: 'C', y: 300, },
    { x: 'D', y: 400, },
  ];

  let summarizationDataSourceService: SummarizationDataSourceService;
  let categoryTopKCoverageSummarizationService: CategoryTopKCoverageSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    categoryTopKCoverageSummarizationService = new CategoryTopKCoverageSummarizationService(
      summarizationDataSourceService,
    );
  });

  it('should have validity value between 0 and 1.', done => {

    testSummaries(
      categoryTopKCoverageSummarizationService,
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

  it('should describe top 3 categories coverage by default.', done => {

    testSummaries(
      categoryTopKCoverageSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isCoverageSummary = isTextPartsInSummary('top 3', 'countries', 'D, C, B', 'sessions');

        const coverageSummary = summaries.filter(isCoverageSummary);

        expect(summaries.length).toBe(1);

        expect(coverageSummary.length).toBe(1);
        expect(coverageSummary.every(hasHighValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should describe top 4 categories coverage with custom topk.', done => {

    testSummaries(
      categoryTopKCoverageSummarizationService,
      summarizationDataSourceService,
      points,
      { topk: 4 },
      summaries => {
        const isCoverageSummary = isTextPartsInSummary('top 4', 'countries', 'D, C, B, A', 'sessions');

        const coverageSummary = summaries.filter(isCoverageSummary);

        expect(summaries.length).toBe(1);

        expect(coverageSummary.length).toBe(1);
        expect(coverageSummary.every(hasHighValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should describe top categories coverage when number of categories less than config topk.', done => {

    testSummaries(
      categoryTopKCoverageSummarizationService,
      summarizationDataSourceService,
      points,
      { topk: 10 },
      summaries => {
        const isCoverageSummary = isTextPartsInSummary('top 4', 'countries', 'D, C, B, A', 'sessions');

        const coverageSummary = summaries.filter(isCoverageSummary);

        expect(summaries.length).toBe(1);

        expect(coverageSummary.length).toBe(1);
        expect(coverageSummary.every(hasHighValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should describe top 3 categories coverage with custom xlabel.', done => {

    testSummaries(
      categoryTopKCoverageSummarizationService,
      summarizationDataSourceService,
      points,
      { xlabel: 'devices' },
      summaries => {
        const isCoverageSummary = isTextPartsInSummary('top 3', 'devices', 'D, C, B', 'sessions');

        const coverageSummary = summaries.filter(isCoverageSummary);

        expect(summaries.length).toBe(1);

        expect(coverageSummary.length).toBe(1);
        expect(coverageSummary.every(hasHighValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should describe top 3 categories coverage with custom metric.', done => {

    testSummaries(
      categoryTopKCoverageSummarizationService,
      summarizationDataSourceService,
      points,
      { metric: 'users' },
      summaries => {
        const isCoverageSummary = isTextPartsInSummary('top 3', 'countries', 'D, C, B', 'users');

        const coverageSummary = summaries.filter(isCoverageSummary);

        expect(summaries.length).toBe(1);

        expect(coverageSummary.length).toBe(1);
        expect(coverageSummary.every(hasHighValidity)).toBeTrue();
        done();
      },
    );
  });
});
