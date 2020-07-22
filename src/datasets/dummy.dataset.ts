import * as random from 'random';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { DAY } from '../utils/timeUnits';
import { XYPoint } from './metas/types';
import { createLineChartMeta } from './metas/line-chart.meta';
import { TimeSeriesQueryOptions } from './queries/time-series.query';
import * as TrendSummarization from './summarizations/trend.summarization';

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
  const data: XYPoint<Date, number>[] = [];
  const rand = random.normal(0, 500);
  for (let i = 1; i <= 100; i++) {
    data.push({
      x: new Date(time.getTime() + i * DAY),
      y: Math.exp(i / 10) + config.offset + rand() / 2,
    });
  }

  const lineChartMeta = createLineChartMeta(
    'Line Chart',
    (options: TimeSeriesQueryOptions) => [{
      label: 'Dummy Data',
      points: data,
      querySummaries: TrendSummarization.queryFactory(data),
    }],
  );

  const metas = [
    lineChartMeta,
  ];

  return {
    metas,
  };
}
