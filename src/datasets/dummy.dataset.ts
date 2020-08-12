import * as random from 'random';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { DAY } from '../utils/timeUnits';
import { XYPoint } from './metas/types';
import { createLineChartMeta } from './metas/line-chart.meta';
import { TimeSeriesQueryOptions } from './queries/time-series.query';
import { normalizePointsY } from './summarizations/utils/commons';
import { exponentialMovingAverage } from './summarizations/libs/trend';
import * as TrendSummarization from './summarizations/trend.summarization';
import * as TrendPartialSummarization from './summarizations/trend-partial.summarization';

export interface Config {
  offset: number;
}

export const configMeta: PreferenceMeta<Config> = {
  offset: {
    type: 'number',
    defaultValue: 1000,
  },
};

export function create(config: Config): Dataset {
  const time = new Date(Date.now() - 100 * DAY);
  const points: XYPoint<Date, number>[] = [];
  const rand = random.normal(0, 500);
  for (let i = 1; i <= 100; i++) {
    points.push({
      x: new Date(time.getTime() + i * DAY),
      y: Math.exp(i / 10) + config.offset + rand(),
    });
  }


  const metas = [
    createLineChartMeta(
      'Line Chart',
      (options: TimeSeriesQueryOptions) => ({
        data: [
          {
            label: 'Dummy Data',
            points: exponentialMovingAverage(points),
            querySummaries: TrendPartialSummarization.queryFactory(points),
            style: {
              color: 'green',
            },
          }, {
            label: 'Dummy Data',
            points,
            style: {
              opacity: 0.5,
            },
          }],
      })
    )
  ];

  return {
    metas,
  };
}
