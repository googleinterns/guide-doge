import { Dataset, LineChartMeta, TabbedChartsMeta } from './types';
import {
  activeUserMeasure,
  browserCategory,
  countryCategory,
  eventCountMeasure,
  revenueMeasure,
  sourceCategory,
} from '../models/data-cube/presets';
import { generateCube } from 'src/models/data-cube/generation';
import { humanizeMeasureName } from '../utils/formatters';
import { createTimeSeriesQuery } from './queries/time-series.query';

export interface Config {
  avgHits: number;
  hitStdDev: number;
  avgUsers: number;
  userStdDev: number;
  avgSessionsPerUser: number;
  sessionsPerUserStdDev: number;
}

export const defaultConfig: Config = {
  avgHits: 10000,
  hitStdDev: 100,
  avgUsers: 100,
  userStdDev: 1,
  avgSessionsPerUser: 5,
  sessionsPerUserStdDev: 3,
};

export function create(config: Config): Dataset {
  const categories = [countryCategory, browserCategory, sourceCategory];
  const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];

  const dataCube = generateCube(categories, measures, {
    ...defaultConfig,
    ...config,
  });

  const metas = [
    {
      type: 'tabbed' as 'tabbed',
      metas: measures.map(measure => {
        const label = humanizeMeasureName(measure.name);
        return {
          type: 'line',
          title: label,
          query: createTimeSeriesQuery(dataCube, [{
            label,
            measureName: measure.name,
            style: {},
          }]),
        };
      }),
      title: 'Tabbed Line Chart',
    } as TabbedChartsMeta,
    {
      type: 'line',
      title: 'Line Chart',
      query: createTimeSeriesQuery(dataCube, [{
        label: 'Active User',
        measureName: 'activeUsers',
        style: {},
      }]),
    } as LineChartMeta,
  ];

  return {
    metas,
    dataCube,
  };
}
