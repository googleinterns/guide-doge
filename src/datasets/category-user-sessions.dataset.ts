import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { createBarChartMeta, createPieChartMeta } from './metas/categorical.meta';
import { CategoricalQueryOptions } from './queries/categorical.query';
import { SUMMARIZATION } from '../services/summarization/types';

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
  const sessionsByCountryPoints = ([
    { x: 'US', y: US },
    { x: 'India', y: India },
    { x: 'Canada', y: Canada },
    { x: 'UK', y: UK },
    { x: 'Japan', y: Japan },
  ]).filter((_, i) => i < parseInt(NumberOfDisplayItems, 10));

  const sessionsByCountryBarChartSummarizationMetas = [
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

  const sessionsByCountryPieChartSummarizationMetas = [
    SUMMARIZATION.CATEGORY_TOPK,
    SUMMARIZATION.CATEGORY_TOPK_COVERAGE,
    SUMMARIZATION.CATEGORY_BUCKET_COMPARISON,
  ].map(summarization => ({
    summarization,
    config: {
      datumLabels: ['Country Sessions'],
      topk: 2,
      metric: 'sessions',
      xlabel: 'countries',
      showPercentage: true,
    },
  }));

  const barChartMeta = createBarChartMeta(
    'Sessions By Country',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByCountryPoints,
    }],
    sessionsByCountryBarChartSummarizationMetas,
  );

  const pieChartMeta = createPieChartMeta(
    'Sessions By Device',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByCountryPoints,
    }],
    sessionsByCountryPieChartSummarizationMetas,
  );

  const metas = [
    pieChartMeta,
    barChartMeta,
  ];

  return {
    metas,
  };
}
