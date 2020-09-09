import * as random from 'random';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { createBarChartMeta } from './metas/categorical.meta';
import { CategoricalQueryOptions } from './queries/categorical.query';
import { combineQuerySummariesFactories } from './summarizations/utils/commons';
import * as CategoryTopKSummarization from './summarizations/category-topk.summarization';
import * as CategoryTopKCoverageSummarization from './summarizations/category-topk-coverage.summarization';
import * as CategoryBucketComparisonSummarization from './summarizations/category-bucket-comparison.summarization';

export type Config = {};

export const configMeta: PreferenceMeta<Config> = {};

export function create(config: Config): Dataset {
  const points = [
    { x: 'US', y: 4820 },
    { x: 'India', y: 870 },
    { x: 'Canada', y: 530 },
    { x: 'UK', y: 340 },
    { x: 'Japan', y: 270 },
  ];

  const querySummariesFactory = combineQuerySummariesFactories(
    CategoryTopKSummarization.queryFactory,
    CategoryTopKCoverageSummarization.queryFactory,
    CategoryBucketComparisonSummarization.queryFactory,
  );

  const barChartMeta = createBarChartMeta(
    'Sessions By Country',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points,
      querySummaries: querySummariesFactory(points),
    }],
  );

  const metas = [
    barChartMeta,
  ];

  return {
    metas,
  };
}
