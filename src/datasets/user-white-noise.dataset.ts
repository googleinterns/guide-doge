import { Dataset } from './types';
import {
  activeUserMeasure,
  browserCategory,
  countryCategory,
  eventCountMeasure,
  revenueMeasure,
  sourceCategory,
} from '../models/data-cube/presets';
import { generateCube } from '../models/data-cube/generation';
import { humanizeMeasureName } from '../utils/formatters';
import { createTimeSeriesQuery } from './queries/time-series.query';
import { createLineChartMeta } from './metas/line-chart.meta';
import { createTabbedChartsMeta } from './metas/tabbed-charts.meta';

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

  const tabbedChartsMeta = createTabbedChartsMeta(
    'Tabbed Line Chart',
    measures.map(measure => {
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
  );

  const lineChartMeta = createLineChartMeta(
    'Line Chart',
    createTimeSeriesQuery(dataCube, [{
      label: 'Active User',
      measureName: 'activeUsers',
      style: {},
    }]),
  );

  const metas = [
    tabbedChartsMeta,
    lineChartMeta,
  ];

  return {
    metas,
    dataCube,
  };
}
