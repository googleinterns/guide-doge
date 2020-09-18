import { Dataset } from './types';
import * as random from 'random';
import { Measure, Category, MeasureType, Scope, CategoryValue } from '../models/data-cube/types';
import { generateCube } from '../models/data-cube/generation';
import { createTimeSeriesQuery } from './queries/time-series.query';
import { createLineChartMeta } from './metas/line-chart.meta';
import { PreferenceMeta } from '../services/preference/types';
import { DAY } from '../utils/timeUnits';
import { SummarizationMeta, SUMMARIZATION } from '../services/summarization/types';

export interface Config {
  dailyWeightStd: number;
  workdayHolidayActiveRatio: number;
  linearIncreasingFactor: number;
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
  linearIncreasingFactor: {
    type: 'number',
    defaultValue: 5,
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
    linearIncreasingFactor,
  } = config;

  const dateCategory = generateDateCategory(
    startDate,
    endDate,
    dailyWeightStd,
    workdayHolidayActiveRatio,
    linearIncreasingFactor,
  );

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
      {
        summarization: SUMMARIZATION.WEEKDAY_WEEKEND_RELATIVE,
        config: {
          datumLabels: ['Active Users'],
        }
      },
      {
        summarization: SUMMARIZATION.TREND_REGRESSION,
        config: {
          datumLabels: ['Active Users'],
        }
      },
      {
        summarization: SUMMARIZATION.TREND_WEEKLY_PATTERN,
        config: {
          datumLabels: ['Active Users'],
        }
      },
      {
        summarization: SUMMARIZATION.TREND_WEEKLY_COMPARISON_AVERAGE,
        config: {
          datumLabels: ['Active Users'],
        }
      },
      {
        summarization: SUMMARIZATION.TREND_WEEKLY_COMPARISON_RATE,
        config: {
          datumLabels: ['Active Users'],
        }
      },
      {
        summarization: SUMMARIZATION.TREND_WEEKLY_ELABORATION,
        config: {
          datumLabels: ['Active Users'],
        }
      },
      {
        summarization: SUMMARIZATION.TREND_PARTIAL,
        config: {
          datumLabels: ['Active Users'],
        }
      },
    ]
  );

  const metas = [
    lineChartMeta,
  ];

  return {
    metas,
    dataCube,
  };
}


function generateDateCategory(
  startDate: Date,
  endDate: Date,
  dailyVariance: number,
  workdayToHolidayUserActiveRatio: number,
  linearIncreasingFactor: number,
): Category {
  const dailyThunk = random.normal(0, dailyVariance);
  const values: CategoryValue[] = [];

  const holidayWeightMean = 1;
  const workdayWeightMean = workdayToHolidayUserActiveRatio * holidayWeightMean;
  const normalizeFactor = 1 / (holidayWeightMean * 2 + workdayWeightMean * 5);

  const date = new Date(startDate);
  for (let i = 0; date <= endDate; i++) {
    let weight = Math.pow(i, Math.abs(linearIncreasingFactor));

    if (date.getDay() === 0 || date.getDay() === 6) {
      weight *= Math.max(holidayWeightMean + dailyThunk(), 0) * normalizeFactor;
    } else {
      weight *= Math.max(workdayWeightMean + dailyThunk()) * normalizeFactor;
    }

    values.push({
      name: date.getTime(),
      weight
    });
    date.setTime(date.getTime() + DAY);
  }

  if (linearIncreasingFactor < 0) {
    for (let i = 0; i < values.length / 2; i++) {
      const j = values.length - i - 1;
      const t = values[j].weight;
      values[j].weight = values[i].weight;
      values[i].weight = t;
    }
  }


  return {
    name: 'date',
    values,
  };
}
