import * as random from 'random';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { DAY } from '../utils/timeUnits';
import { XYPoint } from './metas/types';
import { createLineChartMeta } from './metas/line-chart.meta';
import { TimeSeriesQueryOptions } from './queries/time-series.query';

export interface Config {
  offset: number;
}

export const configMeta: PreferenceMeta<Config> = {
  offset: {
    type: 'number',
    defaultValue: 1000,
  },
};

/**
 * Creates an exponential growth dataset with daily granularity.
 * Start date is 100 days ago and end date is today.
 */
export function create(config: Config): Dataset {
  const pointsLength = 100;
  const expContinuousGrowthRate = 0.1;

  const points: XYPoint<Date, number>[] = [];
  const startDate = new Date(Date.now() - pointsLength * DAY);
  const rand = random.normal(0, 250);

  for (let i = 1; i <= pointsLength; i++) {
    points.push({
      x: new Date(startDate.getTime() + i * DAY),
      y: Math.exp(i * expContinuousGrowthRate) + config.offset + rand(),
    });
  }

  const lineChartMeta = createLineChartMeta(
    'Line Chart',
    (options: TimeSeriesQueryOptions) => [{
      label: 'Dummy Data',
      points,
    }],
  );

  const metas = [
    lineChartMeta,
  ];

  return {
    metas,
  };
}
