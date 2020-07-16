import { Summary } from './types';
import { TimeSeriesPoint } from '../queries/time-series.query';
import { cacheSummaries } from './utils/commons';
import {
  PointMembershipFunction,
  MembershipFunction,
  trapezoidalMF,
  trapezoidalMFL,
  trapezoidalMFR,
  sigmaCountQAB,
} from './libs/protoform';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const uHighTraffic = ({ y }) => trapezoidalMFL(130, 150)(y);
    const uMediumTraffic = ({ y }) => trapezoidalMF(50, 70, 130, 150)(y);
    const uLowTraffic = ({ y }) => trapezoidalMFR(50, 70)(y);

    const uMostPercentage = trapezoidalMFL(0.6, 0.7);
    const uHalfPercentage = trapezoidalMF(0.3, 0.4, 0.6, 0.7);
    const uFewPercentage = trapezoidalMF(0.05, 0.1, 0.3, 0.4);

    const uWeekend = ({ x }) => x.getDay() === 5 ? 0.2 : +(x.getDay() === 0 || x.getDay() === 6);
    const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);

    const uPercentages: [string, MembershipFunction][] = [
      ['most', uMostPercentage],
      ['half', uHalfPercentage],
      ['few', uFewPercentage],
    ];

    const uDays: [string, PointMembershipFunction<TimeSeriesPoint>][] = [
      ['weekdays', uWeekday],
      ['weekends', uWeekend],
    ];

    const uTraffics: [string, PointMembershipFunction<TimeSeriesPoint>][] = [
      ['high (Count > 140)', uHighTraffic],
      ['medium (60 < Count < 140)', uMediumTraffic],
      ['low (Count < 60)', uLowTraffic],
    ];

    const summaries: Summary[] = [];
    for (const [quantifier, uPercentage] of uPercentages) {
      for (const [day, uDay] of uDays) {
        for (const [traffic, uTraffic] of uTraffics) {
          const t = sigmaCountQAB(points, uPercentage, uDay, uTraffic);
          summaries.push({
            text: `<b>${quantifier}</b> of the <b>${day}</b> have <b>${traffic}</b> traffic.`,
            validity: t
          });
        }
      }
    }
    return summaries;
  });
}
