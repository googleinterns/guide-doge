import { SummarizationDataSourceService } from './summarization-data-source.service';
import { CategoryBucketComparisonSummarizationService } from './category-bucket-comparison.summarization.service';
import { testSummaries, hasHighValidity, isTextPartsInSummary } from './utils/tests';
import { CategoricalPoint } from '../../datasets/metas/types';

describe('CategoryBucketComparisonSummarizationService', () => {

  const points: CategoricalPoint[] = [
    { x: 'A', y: 100, },
    { x: 'B', y: 200, },
    { x: 'C', y: 399, },
    { x: 'D', y: 400, },
  ];

  let summarizationDataSourceService: SummarizationDataSourceService;
  let categoryBucketComparisonSummarizationService: CategoryBucketComparisonSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    categoryBucketComparisonSummarizationService = new CategoryBucketComparisonSummarizationService(
      summarizationDataSourceService,
    );
  });

  it('should have validity value between 0 and 1.', done => {

    testSummaries(
      categoryBucketComparisonSummarizationService,
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

  it('should describe comparison between buckets.', done => {
    testSummaries(
      categoryBucketComparisonSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const isDCtoBSummary = isTextPartsInSummary('D, C', 'have', 'more sessions than', 'B');
        const isBtoASummary = isTextPartsInSummary('B', 'has', 'more sessions than', 'A');

        const DCtoBSummary = summaries.filter(isDCtoBSummary);
        const BtoASummary = summaries.filter(isBtoASummary);

        expect(summaries.length).toBe(2);

        expect(DCtoBSummary.length).toBe(1);
        expect(DCtoBSummary.every(hasHighValidity)).toBeTrue();
        expect(BtoASummary.length).toBe(1);
        expect(BtoASummary.every(hasHighValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should describe comparison between buckets with custom bucket percentage tolerance.', done => {

    testSummaries(
      categoryBucketComparisonSummarizationService,
      summarizationDataSourceService,
      points,
      { bucketPercentageTolerance: 30 },
      summaries => {
        const isDCtoBASummary = isTextPartsInSummary('D, C', 'have', 'more sessions than', 'B, A');

        const DCtoBASummary = summaries.filter(isDCtoBASummary);

        expect(summaries.length).toBe(1);

        expect(DCtoBASummary.length).toBe(1);
        expect(DCtoBASummary.every(hasHighValidity)).toBeTrue();
        done();
      },
    );
  });

  it('should describe comparison between buckets with custom metric.', done => {

    testSummaries(
      categoryBucketComparisonSummarizationService,
      summarizationDataSourceService,
      points,
      { metric: 'users' },
      summaries => {
        const isDCtoBSummary = isTextPartsInSummary('D, C', 'have', 'more users than', 'B');
        const isBtoASummary = isTextPartsInSummary('B', 'has', 'more users than', 'A');

        const DCtoBSummary = summaries.filter(isDCtoBSummary);
        const BtoASummary = summaries.filter(isBtoASummary);

        expect(summaries.length).toBe(2);

        expect(DCtoBSummary.length).toBe(1);
        expect(DCtoBSummary.every(hasHighValidity)).toBeTrue();
        expect(BtoASummary.length).toBe(1);
        expect(BtoASummary.every(hasHighValidity)).toBeTrue();
        done();
      },
    );
  });
});
