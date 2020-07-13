import { Summary } from './types';
import { TimeSeriesPoint } from '../queries/time-series.query';
import { tFunc, tFuncL, tFuncR } from './utils';

export function queryFactory(points: TimeSeriesPoint[]) {
  let summariesCache: Summary[] | null = null;
  return () => {
    if (summariesCache) {
      return summariesCache;
    }

    const uHighTraffic = ({ y }) => tFuncL(120, 150)(y);
    const uMediumTraffic = ({ y }) => tFunc(50, 75, 125, 150)(y);
    const uLowTraffic = ({ y }) => tFuncR(50, 75)(y);

    const uMostPercentage = (v: number) => tFuncL(0.6, 0.7)(v);
    const uHalfPercentage = (v: number) => tFunc(0.3, 0.4, 0.6, 0.7)(v);
    const uFewPercentage = (v: number) => tFuncR(0.3, 0.4)(v);

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
}
