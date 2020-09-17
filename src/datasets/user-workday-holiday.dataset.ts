import { Dataset } from './types';
import * as random from 'random';
import { Measure, Category, MeasureType, Scope, CategoryValue } from '../models/data-cube/types';
import { generateCube } from '../models/data-cube/generation';
import { createTimeSeriesQuery } from './queries/time-series.query';
import { createLineChartMeta } from './metas/line-chart.meta';
import { PreferenceMeta } from '../services/preference/types';
import { DAY } from '../utils/timeUnits';
import { SUMMARIZATION } from '../services/summarization/types';

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
    defaultValue: 10,
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

  const activeUserMeasure: Measure = {
    name: 'activeUsers',
    scope: Scope.USER,
    type: MeasureType.COUNT,
  };


  const categories = [dateCategory, userIDCategory];
  const measures = [activeUserMeasure];

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

  const lineChartMeta = createLineChartMeta(
    'Active Users',
    createTimeSeriesQuery(dataCube, [{
      label: 'Active Users',
      measureName: 'activeUsers',
    }]),
    [
      SUMMARIZATION.WEEKDAY_WEEKEND_RELATIVE,
      SUMMARIZATION.TREND_REGRESSION,
      SUMMARIZATION.TREND_WEEKLY_PATTERN,
      SUMMARIZATION.TREND_WEEKLY_COMPARISON_AVERAGE,
      SUMMARIZATION.TREND_WEEKLY_COMPARISON_RATE,
      SUMMARIZATION.TREND_WEEKLY_ELABORATION,
      SUMMARIZATION.TREND_PARTIAL,
    ].map(summarization => ({
      summarization,
      config: {
        datumLabels: ['Active Users'],
        metric: 'active users',
        metricUnit: 'users'
      },
    })),
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
