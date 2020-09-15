import { Summary, SummaryVariableOptionPair } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import { groupPointsByXWeek } from './utils/time-series';
import {
  PointMembershipFunction,
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from './libs/protoform';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const uHigherTraffic = ({ y }) => trapmfL(1.2, 1.4)(y);
    const uEqualTraffic = ({ y }) => trapmf(0.6, 0.8, 1.2, 1.4)(y);
    const uLowerTraffic = ({ y }) => trapmfR(0.6, 0.8)(y);

    const uMostPercentage = trapmfL(0.6, 0.7);
    const uHalfPercentage = trapmf(0.3, 0.4, 0.6, 0.7);
    const uFewPercentage = trapmf(0.05, 0.1, 0.3, 0.4);

    const uWeekend = ({ x }) => x.getDay() === 5 ? 0.2 : +(x.getDay() === 0 || x.getDay() === 6);
    const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);

    points = groupPointsByXWeek(points).map(weekPoints => {
      const week = weekPoints[0].x;
      const wWeekdays = weekPoints.reduce((p, v) => p + uWeekday(v), 0);
      const wWeekends = weekPoints.reduce((p, v) => p + uWeekend(v), 0);
      const sWeekdays = weekPoints.reduce((p, v) => p + v.y * uWeekday(v), 0);
      const sWeekends = weekPoints.reduce((p, v) => p + v.y * uWeekend(v), 0);

      if (wWeekdays < 1e-7 || wWeekends < 1e-7) {
        return { x: week, y: -1 };
      } else {
        const avgWeekday = sWeekdays / wWeekdays;
        const avgHoliday = sWeekends / wWeekends;
        const weekdayHolidayRatio = avgWeekday / avgHoliday;
        return { x: week, y: weekdayHolidayRatio };
      }
    }).filter(({ y }) => y >= 0);

    const uPercentages: SummaryVariableOptionPair<MembershipFunction>[] = [
      ['most', uMostPercentage],
      ['half', uHalfPercentage],
      ['few', uFewPercentage],
    ];

    const uTraffics: SummaryVariableOptionPair<PointMembershipFunction<TimeSeriesPoint>>[] = [
      ['higher (WorkdayCount/HolidayCount > 1.3) than', uHigherTraffic],
      ['equal (0.7 < WorkdayCount/HolidayCount < 1.3) to', uEqualTraffic],
      ['lower (WorkdayCount/HolidayCount < 0.7) than', uLowerTraffic],
    ];

    const summaries: Summary[] = [];
    for (const [quantifier, uPercentage] of uPercentages) {
      for (const [traffic, uTraffic] of uTraffics) {
        const t = sigmaCountQA(points, uPercentage, uTraffic);
        summaries.push({
          text: `In <b>${quantifier}</b> of the weeks, weekdays have traffic <b>${traffic}</b> weekends.`,
          validity: t
        });
      }
    }

    return [{
      title: 'Workday Holiday Relative',
      summaries
    }];
  });
}
