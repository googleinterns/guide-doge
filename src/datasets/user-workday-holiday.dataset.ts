import { Dataset } from './types';
import * as random from 'random';
import { Measure, Category, MeasureType, Scope, CategoryValue } from '../models/data-cube/types';
import { generateCube } from '../models/data-cube/generation';
import { humanizeMeasureName } from '../utils/formatters';
import { createTimeSeriesQuery } from './queries/time-series.query';
import { createLineChartMeta } from './metas/line-chart.meta';
import { createTabbedChartsMeta } from './metas/tabbed-charts.meta';
import { PreferenceMeta } from '../services/preference/types';
import { createDefault } from '../utils/preferences';
import { DAY } from '../utils/timeUnits';
import { TimeSeriesPoint } from './queries/time-series.query';

export interface Config {
  dailyWeightStd: number;
  workdayHolidayActiveRatio: number;
}

export const configMeta: PreferenceMeta<Config> = {
  dailyWeightStd: {
    type: 'number',
    defaultValue: 0.5,
  },
  workdayHolidayActiveRatio: {
    type: 'number',
    defaultValue: 2,
  },
};

export function create(config: Config): Dataset {
  const nUsers = 100;
  const userIDCategory: Category = {
    name: 'userID',
    values: [...Array(nUsers).keys()].map(i => ({
      name: `USER-${i}`,
      weight: 10,
    })),
  };

  const defaultStartDaysBeforeNow = 90;
  const startDate = new Date(Date.now() - defaultStartDaysBeforeNow * DAY);
  const endDate = new Date();
  const {
    dailyWeightStd,
    workdayHolidayActiveRatio,
  } = config;

  const dateCategory = generateDateCategory(startDate, endDate, dailyWeightStd, workdayHolidayActiveRatio);

  const visitCountMeasure: Measure = {
    name: 'visitCount',
    scope: Scope.USER,
    type: MeasureType.COUNT,
  };


  const categories = [dateCategory, userIDCategory];
  const measures = [visitCountMeasure];

  const generateCubeConfig = {
    avgHits: 10000,
    hitStdDev: 10,
    avgUsers: 1000,
    userStdDev: 10,
    avgSessionsPerUser: 5,
    sessionsPerUserStdDev: 3,
    timeSeries: false,
  };

  const dataCube = generateCube(categories, measures, generateCubeConfig);

  const visitCountSummarizationQueryFactory = (points: TimeSeriesPoint[]) => {
    return () => [{
      text: 'Helloworld',
      validity: 1.0,
    }];
  };

  const lineChartMeta = createLineChartMeta(
    'Visit Count',
    createTimeSeriesQuery(dataCube, [{
      label: 'Visit Count',
      measureName: 'visitCount',
      summarizationQueryFactory: visitCountSummarizationQueryFactory,
    }]),
  );

  const metas = [
    lineChartMeta,
  ];

  return {
    metas,
    dataCube,
  };
}


function generateDateCategory(startDate: Date, endDate: Date, dailyVariance: number, workdayToHolidayUserActiveRatio: number): Category {
  const dailyThunk = random.normal(0, dailyVariance);
  const values: CategoryValue[] = [];
  const date = new Date(startDate);

  const holidayWeightMean = 1;
  const workdayWeightMean = workdayToHolidayUserActiveRatio * holidayWeightMean;
  const normalizeFactor = 1 / (holidayWeightMean * 2 + workdayWeightMean * 5);

  while (date <= endDate) {
    if (date.getDay() === 0 || date.getDay() === 6) {
      values.push({
        name: date.getTime(),
        weight: Math.max(holidayWeightMean + dailyThunk(), 0) * normalizeFactor,
      });
    } else {
      values.push({
        name: date.getTime(),
        weight: Math.max(workdayWeightMean + dailyThunk()) * normalizeFactor,
      });
    }
    date.setTime(date.getTime() + DAY);
  }

  return {
    name: 'date',
    values,
  };
}
