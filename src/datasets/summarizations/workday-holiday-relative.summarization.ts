import { Summary } from './types';
import { TimeSeriesPoint } from '../queries/time-series.query';
import { cacheSummaries } from './utils/commons';
import { groupPointsByXWeek } from './utils/time-series';
import {
  PointMembershipFunction,
  MembershipFunction,
  trapezoidalMF,
  trapezoidalMFL,
  trapezoidalMFR,
  sigmaCountQA,
} from './libs/protoform';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const uHigherTraffic = ({ y }) => trapezoidalMFL(1.2, 1.4)(y);
    const uEqualTraffic = ({ y }) => trapezoidalMF(0.6, 0.8, 1.2, 1.4)(y);
    const uLowerTraffic = ({ y }) => trapezoidalMFR(0.6, 0.8)(y);

    const uMostPercentage = trapezoidalMFL(0.6, 0.7);
    const uHalfPercentage = trapezoidalMF(0.3, 0.4, 0.6, 0.7);
    const uFewPercentage = trapezoidalMF(0.05, 0.1, 0.3, 0.4);

    const uHoliday = ({ x }) => x.getDay() === 5 ? 0.2 : +(x.getDay() === 0 || x.getDay() === 6);
    const uWeekday = (p: TimeSeriesPoint) => 1 - uHoliday(p);

    points = groupPointsByXWeek(points).map(weekPoints => {
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

    const uPercentages: [string, MembershipFunction][] = [
      ['most', uMostPercentage],
      ['half', uHalfPercentage],
      ['few', uFewPercentage],
    ];

    const uTraffics: [string, PointMembershipFunction<TimeSeriesPoint>][] = [
      ['higher (WorkdayCount/HolidayCount > 1.3)', uHigherTraffic],
      ['equal (0.7 < WorkdayCount/HolidayCount < 1.3)', uEqualTraffic],
      ['lower (WorkdayCount/HolidayCount < 0.7)', uLowerTraffic],
    ];

    const summaries: Summary[] = [];
    for (const [quantifier, uPercentage] of uPercentages) {
      for (const [traffic, uTraffic] of uTraffics) {
        const t = sigmaCountQA(points, uPercentage, uTraffic);
        summaries.push({
          text: `In <b>${quantifier}</b> of weeks, weekdays has <b>${traffic}</b> traffic.`,
          validity: t
        });
      }
    }

    return summaries;
  });
}
