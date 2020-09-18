import * as random from 'random';
import { TimeSeriesPoint } from './metas/types';
import { DAY } from '../utils/timeUnits';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { createLineChartMeta } from './metas/line-chart.meta';
import { createBarChartMeta, createPieChartMeta } from './metas/categorical.meta';
import { TimeSeriesQueryOptions } from './queries/time-series.query';
import { CategoricalQueryOptions } from './queries/categorical.query';
import { SUMMARIZATION } from '../services/summarization/types';

export type Config = {};

export const configMeta: PreferenceMeta<Config> = {};

export function create(config: Config): Dataset {
  const sessionsByCountryPoints = [
    { x: 'US', y: 4820 },
    { x: 'India', y: 2330 },
    { x: 'Canada', y: 790 },
    { x: 'UK', y: 340 },
    { x: 'Japan', y: 270 },
  ];
  const sessionsByDevicePoints = [
    { x: 'Desktop', y: 6860 },
    { x: 'Mobile', y: 2990 },
    { x: 'Tablet', y: 730 },
    { x: 'Others', y: 150 },
  ];


  const activeUsersPointsLength = 28;
  const activeUsersPoints: TimeSeriesPoint[] = [];

  const activeUsersWeekPattern = [-40, 60, 70, 80, 90, 100, -30];
  const activeUsersOffset = 100;
  const activeUsersGrowingRate = 10;

  const startDate = new Date(Date.now() - activeUsersPointsLength * DAY);
  const rand = random.normal(0, 10);

  for (let i = 1; i <= activeUsersPointsLength; i++) {
    const x = new Date(startDate.getTime() + i * DAY);
    const y = activeUsersOffset + i * activeUsersGrowingRate + activeUsersWeekPattern[x.getDay()] + rand();
    activeUsersPoints.push({ x, y });
  }

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
      topk: 2,
      metric: 'sessions',
      xlabel: 'devices',
      showPercentage: true,
    },
  }));

  const activeUsersSummarizationMetas = [
    SUMMARIZATION.TREND_REGRESSION,
    SUMMARIZATION.WEEKDAY_WEEKEND_RELATIVE,
    SUMMARIZATION.TREND_WEEKLY_PATTERN,
    SUMMARIZATION.TREND_WEEKLY_COMPARISON_AVERAGE,
    SUMMARIZATION.TREND_WEEKLY_COMPARISON_RATE,
    SUMMARIZATION.TREND_WEEKLY_ELABORATION,
    SUMMARIZATION.TREND_PARTIAL,
  ].map(summarization => ({
    summarization,
    config: {
      datumLabels: ['Last 28 days'],
      metric: 'active users',
      metricUnit: 'users',
    },
  }));

  const sessionsByCountryBarChartMeta = createBarChartMeta(
    'Sessions By Country',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByCountryPoints,
    }],
    sessionsByCountrySummarizationMetas,
  );

  const sessionsByDevicePieChartMeta = createPieChartMeta(
    'Sessions By Device',
    (options: CategoricalQueryOptions) => [{
      label: 'Device Sessions',
      points: sessionsByDevicePoints,
    }],
    sessionsByDeviceSummarizationMetas,
  );

  const activeUsersLineChartMeta = createLineChartMeta(
    'Active Users',
    (options: TimeSeriesQueryOptions) => [{
      label: 'Last 28 days',
      points: activeUsersPoints,
    }],
    activeUsersSummarizationMetas,
  );

  const metas = [
    sessionsByCountryBarChartMeta,
    sessionsByDevicePieChartMeta,
    activeUsersLineChartMeta,
  ];

  return {
    metas,
  };
}
