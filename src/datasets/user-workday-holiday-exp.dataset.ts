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
import { Summary } from './summarizations/types';

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

  const visitCountSummariesQueryFactory = (points: TimeSeriesPoint[]) => {
    let summariesCache: Summary[] | null = null;
    return () => {
      if (summariesCache) {
        return summariesCache;
      }

      const tFunc = (bStart, cStart, cEnd, bEnd) => (v) => {
        if (v < bStart) {
          return 0.0;
        } else if (bStart <= v && v < cStart) {
          return (v - bStart) / (cStart - bStart);
        } else if (cStart <= v && v < cEnd) {
          return 1.0;
        } else if (cEnd <= v && v < bEnd) {
          return 1.0 - (v - cEnd) / (bEnd - cEnd);
        } else {
          return 0.0;
        }
      };

      const tFuncL = (bStart, cStart) => tFunc(bStart, cStart, Infinity, Infinity);
      const tFuncR = (cEnd, bEnd) => tFunc(-Infinity, -Infinity, cEnd, bEnd);

      const uHighTraffic = ({ y }) => tFuncL(120, 150)(y);
      const uMediumTraffic = ({ y }) => tFunc(50, 75, 125, 150)(y);
      const uLowTraffic = ({ y }) => tFuncR(50, 75)(y);

      const uMostPercentage = (v) => tFuncL(0.6, 0.7)(v);
      const uHalfPercentage = (v) => tFunc(0.3, 0.4, 0.6, 0.7)(v);
      const uFewPercentage = (v) => tFuncR(0.3, 0.4)(v);

      const uHoliday = ({ x }) => x.getDay() === 5 ? 0.5 : +(x.getDay() === 0 || x.getDay() === 6);
      const uWeekday = pair => 1 - uHoliday(pair);

      const uTraffics = {
        high: uHighTraffic,
        medium: uMediumTraffic,
        low: uLowTraffic,
      };

      const uPercentages = {
        most: uMostPercentage,
        half: uHalfPercentage,
        few: uFewPercentage,
      };

      const uDays = {
        weekday: uWeekday,
        holiday: uHoliday,
      };

      const sigmaCountQAB = (fQ, fA, fB): number => {
        const uA: number[] = points.map(fA);
        const uB: number[] = points.map(fB);
        const n = uA.map((ua, i) => ua * uB[i]).reduce((p, v) => p + v, 0);
        const d = uA.reduce((p, v) => p + v, 0) + 1e-7;
        const t = fQ(n / d);
        return t;
      };

      const summaries: Summary[] = [];
      for (const [quantifier, uPercentage] of Object.entries(uPercentages)) {
        for (const [day, uDay] of Object.entries(uDays)) {
          for (const [traffic, uTraffic] of Object.entries(uTraffics)) {
            const t = sigmaCountQAB(uPercentage, uDay, uTraffic);
            summaries.push({
              text: `${quantifier} of ${day}s are ${traffic} traffic.`,
              validity: t
            });
          }
        }
      }

      summariesCache = summaries;
      return summaries;
    };
  };

  const lineChartMeta = createLineChartMeta(
    'Visit Count',
    createTimeSeriesQuery(dataCube, [{
      label: 'Visit Count',
      measureName: 'visitCount',
      summariesQueryFactory: visitCountSummariesQueryFactory,
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

  for (let i = 0; date <= endDate; i++) {
    if (date.getDay() === 0 || date.getDay() === 6) {
      values.push({
        name: date.getTime(),
        weight: Math.max(holidayWeightMean + dailyThunk(), 0) * normalizeFactor * Math.exp(i / 10),
      });
    } else {
      values.push({
        name: date.getTime(),
        weight: Math.max(workdayWeightMean + dailyThunk()) * normalizeFactor * Math.exp(i / 10),
      });
    }
    date.setTime(date.getTime() + DAY);
  }

  return {
    name: 'date',
    values,
  };
}
