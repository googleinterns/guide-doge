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
import { PreferenceMeta } from '../services/preference/types';
import { createDefault } from '../utils/preferences';
import { DAY } from '../utils/timeUnits';

export interface Config {
  avgHits: number;
  hitStdDev: number;
  avgUsers: number;
  userStdDev: number;
  avgSessionsPerUser: number;
  sessionsPerUserStdDev: number;
}

export const configMeta: PreferenceMeta<Config> = {
  avgHits: {
    type: 'number',
    defaultValue: 10000,
  },
  hitStdDev: {
    type: 'number',
    defaultValue: 100,
  },
  avgUsers: {
    type: 'number',
    defaultValue: 100,
  },
  userStdDev: {
    type: 'number',
    defaultValue: 1,
  },
  avgSessionsPerUser: {
    type: 'number',
    defaultValue: 5,
  },
  sessionsPerUserStdDev: {
    type: 'number',
    defaultValue: 3,
  },
};

export function create(config: Config): Dataset {
  const categories = [countryCategory, browserCategory, sourceCategory];
  const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];

  const defaultConfig = createDefault(configMeta);
  const dataCube = generateCube(categories, measures, {
    ...defaultConfig,
    ...config,
  });

  const tabbedChartsMeta = createTabbedChartsMeta(
    'Tabbed Line Chart',
    measures.map(measure => {
      const label = humanizeMeasureName(measure.name);
      return createLineChartMeta(
        label,
        createTimeSeriesQuery(dataCube, [{
          label: '1 day',
          measureName: measure.name,
        }, {
          label: '7 days',
          measureName: measure.name,
          windowSize: 7 * DAY,
          style: { opacity: .6 },
        }, {
          label: '30 days',
          measureName: measure.name,
          windowSize: 30 * DAY,
          style: { opacity: .3 },
        }]),
      );
    }),
  );

  const lineChartMeta = createLineChartMeta(
    'Line Chart',
    createTimeSeriesQuery(dataCube, [{
      label: 'Last 30 days',
      measureName: 'activeUsers',
    }, {
      label: 'Preceding period',
      measureName: 'activeUsers',
      periodOffset: -30 * DAY,
      style: { dashes: [2, 5] },
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
