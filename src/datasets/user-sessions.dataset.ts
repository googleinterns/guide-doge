import * as random from 'random';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { createBarChartMeta, createPieChartMeta } from './metas/categorical.meta';
import { CategoricalQueryOptions } from './queries/categorical.query';
import { SUMMARIZATION } from '../services/summarization/types';

export type Config = {};

export const configMeta: PreferenceMeta<Config> = {};

export function create(config: Config): Dataset {
  const sessionsByCountryPoints = [
    { x: 'US', y: 4820 },
    { x: 'India', y: 870 },
    { x: 'Canada', y: 530 },
    { x: 'UK', y: 340 },
    { x: 'Japan', y: 270 },
  ];
  const sessionsByDevicePoints = [
    { x: 'Desktop', y: 6860 },
    { x: 'Mobile', y: 2990 },
    { x: 'Tablet', y: 150 },
  ];

  const sessionsByCountrySummarizationMetas = [
    SUMMARIZATION.CATEGORY_TOPK,
    SUMMARIZATION.CATEGORY_TOPK_COVERAGE,
    SUMMARIZATION.CATEGORY_BUCKET_COMPARISON,
  ].map(summarization => ({
    summarization,
    config: {
      datumLabels: ['Country Sessions'],
      topk: 3,
      metric: 'sessions',
      xlabel: 'countries',
      showPercentage: false,
    },
  }));

  const sessionsByDeviceSummarizationMetas = [
    SUMMARIZATION.CATEGORY_TOPK,
    SUMMARIZATION.CATEGORY_TOPK_COVERAGE,
    SUMMARIZATION.CATEGORY_BUCKET_COMPARISON,
  ].map(summarization => ({
    summarization,
    config: {
      datumLabels: ['Device Sessions'],
      topk: 3,
      metric: 'sessions',
      xlabel: 'devices',
      showPercentage: true,
    },
  }));

  const barChartMeta = createBarChartMeta(
    'Sessions By Country',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByCountryPoints,
    }],
    sessionsByCountrySummarizationMetas,
  );

  const pieChartMeta = createPieChartMeta(
    'Sessions By Device',
    (options: CategoricalQueryOptions) => [{
      label: 'Device Sessions',
      points: sessionsByDevicePoints,
    }],
    sessionsByDeviceSummarizationMetas,
  );

  const metas = [
    pieChartMeta,
    barChartMeta,
  ];

  return {
    metas,
  };
}
