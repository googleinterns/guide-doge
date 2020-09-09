import * as random from 'random';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { createBarChartMeta } from './metas/categorical.meta';
import { CategoricalQueryOptions } from './queries/categorical.query';
import * as CategoryTopKSummarization from './summarizations/category-topk.summarization';

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

  const barChartMeta = createBarChartMeta(
    'Sessions By Country',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points,
      querySummaries: CategoryTopKSummarization.queryFactory(points),
    }],
  );

  const metas = [
    barChartMeta,
  ];

  return {
    metas,
  };
}
