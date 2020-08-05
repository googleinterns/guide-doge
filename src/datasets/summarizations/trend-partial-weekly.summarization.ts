import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import {
  PointMembershipFunction,
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQAB,
} from './libs/protoform';
import {
  exponentialMovingAverage,
  normalizedUniformPartiallyLinearEpsApprox,
  TimeSeriesPartialTrend,
  groupPartialTrendsByWeek,
} from './libs/trend';
import { formatX } from '../../utils/formatters';
import { groupPointsByXWeek } from './utils/time-series';
import { MINUTE } from 'src/utils/timeUnits';

const kWeekDays = ['__', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', ' Friday', 'Saturday', 'Sunday'];

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const MX = Math.PI / 2;

    const smoothedPoints = exponentialMovingAverage(points, 0.95);
    const trends = normalizedUniformPartiallyLinearEpsApprox(smoothedPoints, 0.01);
    const weeklyTrends = groupPartialTrendsByWeek(trends);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ cone }: TimeSeriesPartialTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad);
    };

    const uIncreasingTrend = applyTrendAngleWithWeight(trapmfL(MX / 4, MX / 2));
    const uConstantTrend = applyTrendAngleWithWeight(trapmf(-MX / 2, -MX / 4, MX / 4, MX / 2));
    const uDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-MX / 2, -MX / 4));

    const uMostPercentage = trapmfL(0.6, 0.7);
    const uBetweenDays = (startDay, endDay) => ({ timeStart, timeEnd }: TimeSeriesPartialTrend) => {
      const s = Math.max(getWeekday(timeStart), startDay);
      const e = Math.min(getWeekday(timeEnd), endDay);
      return Math.max(e - s, 0) / (endDay - startDay);
    };

    // const uBetweenDays = (startDay, endDay) => ({ timeStart, timeEnd }: TimeSeriesPartialTrend) => {
    //   return +(
    //     !(endDay <= getWeekday(timeStart) || startDay >= getWeekday(timeEnd))
    //   );
    // };

    const uTrends: [string, PointMembershipFunction<TimeSeriesPartialTrend>][] = [
      ['increasing', uIncreasingTrend],
      ['constant', uConstantTrend],
      ['decreasing', uDecreasingTrend],
    ];

    const rangePairs: [number, number][] = [];
    for (let startDay = 1; startDay <= 7; startDay++) {
      for (let endDay = startDay + 1; endDay <= 7; endDay++) {
        rangePairs.push([startDay, endDay]);
      }
    }

    const rangeTrendValidity: Record<string, Record<string, number>> = {};
    for (const [startDay, endDay] of rangePairs) {
      for (const [trend, uTrend] of uTrends) {
        const t = sigmaCountQAB(weeklyTrends, uMostPercentage, uBetweenDays(startDay, endDay), uTrend);
        rangeTrendValidity[`${startDay},${endDay}`] = rangeTrendValidity[`${startDay},${endDay}`] ?? {};
        rangeTrendValidity[`${startDay},${endDay}`][trend] = t;
      }
    }

    console.log(rangeTrendValidity)
    const summaries: Summary[] = [];
    for (const [startDay, endDay] of rangePairs) {
      const parentValidity = rangePairs.filter(([s, e]) => {
        if (s === startDay || e === endDay) {
          return e - s > endDay - startDay;
        } else {
          return s < startDay && e > endDay;
        }
      }).map(([s, e]) => {
        // console.log(startDay, endDay, s, e)
        return Math.max(...Object.values(rangeTrendValidity[`${s},${e}`]));
      }).reduce((maxValidity, currentValidity) => Math.max(maxValidity, currentValidity), 0);

      for (const [trend, _] of uTrends) {
        summaries.push({
          text: `most of the trend from <b>${kWeekDays[startDay]}</b> to <b>${kWeekDays[endDay]}</b> is <b>${trend}</b>.`,
          validity: Math.min(rangeTrendValidity[`${startDay},${endDay}`][trend], 1.0 - parentValidity),
        });
      }
    }
    return summaries;
  });
}

function getWeekday(time) {
  return time.getDay() === 0 ? 7 : time.getDay();
}
