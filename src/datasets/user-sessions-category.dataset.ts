import * as random from 'random';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { createBarChartMeta, createPieChartMeta } from './metas/categorical.meta';
import { CategoricalQueryOptions } from './queries/categorical.query';
import { combineQuerySummariesFactories } from './summarizations/utils/commons';
import { QuerySummariesFactory, ConfigurableQuerySummariesFactory } from './summarizations/types';
import * as CategoryTopKSummarization from './summarizations/category-topk.summarization';
import * as CategoryTopKCoverageSummarization from './summarizations/category-topk-coverage.summarization';
import * as CategoryBucketComparisonSummarization from './summarizations/category-bucket-comparison.summarization';

export type Config = {
  NumberOfDisplayItems: string;
  US: number;
  India: number;
  Canada: number;
  UK: number;
  Japan: number;
};

export const configMeta: PreferenceMeta<Config> = {
  NumberOfDisplayItems: {
    type: 'select',
    defaultValue: '5',
    options: ['5', '4', '3', '2'],
  },
  US: {
    type: 'number',
    defaultValue: 4820,
  },
  India: {
    type: 'number',
    defaultValue: 870,
  },
  Canada: {
    type: 'number',
    defaultValue: 530,
  },
  UK: {
    type: 'number',
    defaultValue: 340,
  },
  Japan: {
    type: 'number',
    defaultValue: 270,
  },
};

export function create(config: Config): Dataset {
  const { NumberOfDisplayItems, US, India, Canada, UK, Japan } = config;
  const sessionsByCountriesPoints = ([
    { x: 'US', y: US },
    { x: 'India', y: India },
    { x: 'Canada', y: Canada },
    { x: 'UK', y: UK },
    { x: 'Japan', y: Japan },
  ]).filter((_, i) => i < parseInt(NumberOfDisplayItems, 10));

  const barChartQuerySummariesFactory = combineQuerySummariesFactories(
    CategoryTopKSummarization.queryFactory,
    CategoryTopKCoverageSummarization.queryFactory,
    CategoryBucketComparisonSummarization.queryFactory,
  );

  const pieChartQuerySummariesFactory = combineQuerySummariesFactories(
    bindQueryFactoryConfig(CategoryTopKSummarization.queryFactory, { topk: 2, showPercentage: true }),
    bindQueryFactoryConfig(CategoryTopKCoverageSummarization.queryFactory, { topk: 2 }),
    bindQueryFactoryConfig(CategoryBucketComparisonSummarization.queryFactory, {}),
  );

  const barChartMeta = createBarChartMeta(
    'Sessions By Country',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByCountriesPoints,
      querySummaries: barChartQuerySummariesFactory(sessionsByCountriesPoints),
    }],
  );

  const pieChartMeta = createPieChartMeta(
    'Sessions By Device',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByCountriesPoints,
      querySummaries: pieChartQuerySummariesFactory(sessionsByCountriesPoints),
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

function bindQueryFactoryConfig<P, C>(
  queryFactory: ConfigurableQuerySummariesFactory<P, C>, config: Partial<C>) {
  return (points) => queryFactory(points, config);
}
