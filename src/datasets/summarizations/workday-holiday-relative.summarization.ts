import { Summary } from './types';
import { TimeSeriesPoint } from '../queries/time-series.query';
import { tFunc, tFuncL, tFuncR } from './utils';
import { groupByWeek } from './utils';

export function queryFactory(points: TimeSeriesPoint[]) {
  let summariesCache: Summary[] | null = null;
  return () => {
    if (summariesCache) {
      return summariesCache;
    }

    const uHigherTraffic = ({ y }) => tFuncL(1.2, 1.4)(y);
    const uEqualTraffic = ({ y }) => tFunc(0.6, 0.8, 1.2, 1.4)(y);
    const uLowerTraffic = ({ y }) => tFuncR(0.6, 0.8)(y);

    const uMostPercentage = (v: number) => tFuncL(0.6, 0.7)(v);
    const uHalfPercentage = (v: number) => tFunc(0.3, 0.4, 0.6, 0.7)(v);
    const uFewPercentage = (v: number) => tFunc(0.0, 0.1, 0.3, 0.4)(v);

    const uHoliday = ({ x }) => x.getDay() === 5 ? 0.2 : +(x.getDay() === 0 || x.getDay() === 6);
    const uWeekday = pair => 1 - uHoliday(pair);

    points = groupByWeek(points).map(weekPoints => {
      const week = weekPoints[0].x;
      const wWeekday = weekPoints.reduce((p, v) => p + uWeekday(v), 0);
      const wHoliday = weekPoints.reduce((p, v) => p + uHoliday(v), 0);
      const sWeekday = weekPoints.reduce((p, v) => p + v.y * uWeekday(v), 0);
      const sHoliday = weekPoints.reduce((p, v) => p + v.y * uHoliday(v), 0);

      if (wWeekday < 1e-7 || wHoliday < 1e-7) {
        return { x: week, y: -1 };
      } else {
        const avgWeekday = sWeekday / wWeekday;
        const avgHoliday = sHoliday / wHoliday;
        const weekdayHolidayRatio = avgWeekday / avgHoliday;
        return { x: week, y: weekdayHolidayRatio };
      }
    }).filter(({ y }) => y >= 0);

    const uTraffics = {
      higher: uHigherTraffic,
      equal: uEqualTraffic,
      lower: uLowerTraffic,
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

    const sigmaCountQA = (fQ, fA): number => {
      const uA: number[] = points.map(fA);
      const n = uA.reduce((p, v) => p + v, 0);
      const d = uA.length + 1e-7;
      const t = fQ(n / d);
      return t;
    };

    const summaries: Summary[] = [];
    for (const [quantifier, uPercentage] of Object.entries(uPercentages)) {
      for (const [traffic, uTraffic] of Object.entries(uTraffics)) {
        const t = sigmaCountQA(uPercentage, uTraffic);
        summaries.push({
          text: `In ${quantifier} of week, weekdays has ${traffic} traffic.`,
          validity: t
        });
      }
    }

    summariesCache = summaries;
    return summaries;
  };
}
