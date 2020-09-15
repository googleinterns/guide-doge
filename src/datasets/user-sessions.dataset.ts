import * as random from 'random';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { createBarChartMeta, createPieChartMeta } from './metas/categorical.meta';
import { CategoricalQueryOptions } from './queries/categorical.query';
import { combineQuerySummariesFactories } from './summarizations/utils/commons';
import * as CategoryTopKSummarization from './summarizations/category-topk.summarization';
import * as CategoryTopKCoverageSummarization from './summarizations/category-topk-coverage.summarization';
import * as CategoryBucketComparisonSummarization from './summarizations/category-bucket-comparison.summarization';

export type Config = {};

export const configMeta: PreferenceMeta<Config> = {};

export function create(config: Config): Dataset {
  const sessionsByCountriesPoints = [
    { x: 'US', y: 4820 },
    { x: 'India', y: 870 },
    { x: 'Canada', y: 530 },
    { x: 'UK', y: 340 },
    { x: 'Japan', y: 270 },
  ];
  const sessionsByDevicesPoints = [
    { x: 'Desktop', y: 6860 },
    { x: 'Mobile', y: 2990 },
    { x: 'Tablet', y: 150 },
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
      points: sessionsByCountriesPoints,
      querySummaries: querySummariesFactory(sessionsByCountriesPoints),
    }],
  );

  const pieChartMeta = createPieChartMeta(
    'Sessions By Device',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByDevicesPoints,
      querySummaries: querySummariesFactory(sessionsByDevicesPoints),
    }],
  );

  const metas = [
    pieChartMeta,
    barChartMeta,
  ];

  return {
    metas,
  };
}
