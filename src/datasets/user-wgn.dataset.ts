import { Dataset, LineChartQueryOptions, LineChartMeta } from './types';
import { xBetweenDates } from './utils';
import { ResultRow } from '../models/data-cube/types';
import {
  activeUserMeasure,
  browserCategory,
  countryCategory,
  eventCountMeasure,
  revenueMeasure,
  sourceCategory,
} from '../models/data-cube/presets';
import { inOneOfDateRanges } from '../models/data-cube/filters';
import { generateCube } from 'src/models/data-cube/generation';
import { DAY } from '../utils/timeUnits';
import {
  CompoundMeasure,
  CompoundMeasureType,
  destructureCompoundMeasure,
  isCompoundMeasure,
  namePeriodOverPeriodMeasure,
  nameRollingMeasure,
  PeriodOverPeriodMeasure,
  RollingMeasure,
} from '../utils/compoundMeasures';


export interface UserWGNDatasetConfig {
  avgHits: number;
  hitStdDev: number;
  avgUsers: number;
  userStdDev: number;
  avgSessionsPerUser: number;
  sessionsPerUserStdDev: number;
}

export const UserWGNDatasetDefaultConfig: UserWGNDatasetConfig = {
  avgHits: 10000,
  hitStdDev: 100,
  avgUsers: 100,
  userStdDev: 1,
  avgSessionsPerUser: 5,
  sessionsPerUserStdDev: 3,
};

// TODO: Refactoring
export function UserWGNDataset(config: UserWGNDatasetConfig): Dataset {
  const categories = [countryCategory, browserCategory, sourceCategory];
  const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];

  // TODO: configurable startDate and endDate for data generation in DatasetPreference
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * DAY);

  const dataCube = generateCube(categories, measures, {
    ...UserWGNDatasetDefaultConfig,
    ...config,
  });

  const measureNames = measures.map(measure => measure.name);

  const pureMeasureNames = measureNames.filter(measureName => !isCompoundMeasure(measureName));
  const compoundMeasures = measureNames.filter(isCompoundMeasure).map(destructureCompoundMeasure);
  const windowSizes = compoundMeasures
    .filter((measure: CompoundMeasure): measure is RollingMeasure => measure.type === CompoundMeasureType.ROLLING)
    .map(({ windowSize }) => windowSize);
  const periodOffsets = compoundMeasures
    .filter((measure: CompoundMeasure): measure is PeriodOverPeriodMeasure => measure.type === CompoundMeasureType.PERIOD_OVER_PERIOD)
    .map(({ periodOffset }) => periodOffset);

  const dateCategoryName = 'date';
  const duration = endDate.getTime() - startDate.getTime();
  const maxWindowSize = Math.max(0, ...windowSizes);
  const dateRanges: [Date, Date][] = [0, ...periodOffsets].map(periodOffset => {
    const periodStart = startDate.getTime() + periodOffset;
    const rangeStartDate = new Date(periodStart - maxWindowSize);
    const rangeEndDate = new Date(periodStart + duration);
    return [rangeStartDate, rangeEndDate];
  });
  const dateFilter = inOneOfDateRanges(dateRanges, { excludeStart: true });

  const rawData = dataCube.getDataFor({
    categoryNames: [dateCategoryName, ...pureMeasureNames],
    measureNames,
    filters: [dateFilter],
    sortBy: [dateCategoryName],
  });

  const data = rawData.filter(datum => {
    const { date } = datum.categories;
    return startDate < date && date <= endDate;
  });

  // TODO: Refactoring
  for (const measureName of pureMeasureNames) {
    for (const rollingUnit of windowSizes) {
      attachRollingMeasure(rawData, data, measureName, rollingUnit);
    }
    for (const periodOffset of periodOffsets) {
      attachPeriodOverPeriodMeasure(rawData, data, measureName, periodOffset);
    }
  }

  const makeLineChartMeta = (measureName: string): LineChartMeta => {
    const rows = data.map(row => ({
      x: row.categories.date,
      y: row.values[measureName],
    }));

    const query = (options: LineChartQueryOptions) => ([{
      points: rows.filter(xBetweenDates(...options.range)),
    }]);

    return {
      type: 'line',
      title: measureName,
      xlabel: 'time',
      query,
    };
  };

  const chartMetas = [
    {
      type: 'tabbed' as 'tabbed',
      charts: measureNames.map(makeLineChartMeta),
      title: 'Tabbed Line Chart',
    },
    makeLineChartMeta('activeUsers'),
  ];

  return {
    charts: chartMetas,
    dataCube,
  };
}

function attachRollingMeasure(rawData: ResultRow[], data: ResultRow[], measureName: string, windowSize: number) {
  const newMeasureName = nameRollingMeasure(measureName, windowSize);
  const [headDatum, ...tailData] = data;

  // pre-calculate the sum of the window for the very first datum
  const rollingStart = headDatum.categories.date.getTime() - windowSize;
  let startIndex = rawData.findIndex(datum => rollingStart < datum.categories.date.getTime());
  if (startIndex < 0) {
    return;
  }
  let endIndex = rawData.indexOf(headDatum);
  let sum = rawData
    .slice(startIndex, endIndex + 1)
    .reduce((acc, datum) => acc + datum.values[measureName], 0);
  headDatum.values[newMeasureName] = sum;

  // slide the window for the rest of the data
  for (const datum of tailData) {
    sum += rawData[++endIndex].values[measureName];
    sum -= rawData[startIndex++].values[measureName];
    datum.values[newMeasureName] = sum;
  }
}

function attachPeriodOverPeriodMeasure(rawData: ResultRow[], data: ResultRow[], measureName: string, periodOffset: number) {
  const newMeasureName = namePeriodOverPeriodMeasure(measureName, periodOffset);
  const [headDatum, ...tailData] = data;

  // find the corresponding datum to the very first datum
  const periodStart = headDatum.categories.date.getTime() + periodOffset;
  let index = rawData.findIndex(datum => periodStart === datum.categories.date.getTime());
  if (index < 0) {
    return;
  }
  headDatum.values[newMeasureName] = rawData[index].values[measureName];

  // slide the corresponding datum for the rest of the data
  for (const datum of tailData) {
    datum.values[newMeasureName] = rawData[++index].values[measureName];
  }
}
