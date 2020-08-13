
import { Summary } from './types';
import { TimeSeriesPoint, NumPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import {
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from './libs/protoform';
import {
  linearRegression,
} from './libs/trend';
import {
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
} from './utils/time-series';
import {
  normalizePoints
} from './utils/commons';

export function queryFactory(dataPoints: TimeSeriesPoint[][]) {
  return cacheSummaries(() => {
    const compareXDate = ({ x: a }, { x: b }) => a.getTime() - b.getTime();
    const [activeUserPoints, revenuePoints] = dataPoints;
    activeUserPoints.sort(compareXDate);
    revenuePoints.sort(compareXDate);

    const activeUserRevenuePoints: NumPoint[] = [];
    for (let i = 0; i < activeUserPoints.length; i++) {
      // assume the date (x-value) of active user points and revenue points are aligned
      activeUserRevenuePoints.push({
        x: activeUserPoints[i].y,
        y: revenuePoints[i].y
      });
    }

    const uPositiveCorrelated = trapmfL(0, 0);
    const uNegativeCorrelated = trapmfR(0, 0);
    const uWeak = trapmfR(0.6, 0.7);
    const uStrong = trapmfL(0.6, 0.7);

    const uQnaitifiers: [string, MembershipFunction][] = [
      ['weak', uWeak],
      ['strong', uStrong],
    ];

    const uCorrelations: [string, MembershipFunction][] = [
      ['positive', uPositiveCorrelated],
      ['negative', uNegativeCorrelated],
    ];

    const correlationModel = linearRegression(activeUserRevenuePoints);
    const summaries: Summary[] = [];
    for (const [quantifier, uQuantifier] of uQnaitifiers) {
      for (const [correlation, uCorrelation] of uCorrelations) {
        const t = Math.min(uQuantifier(correlationModel.r2), uCorrelation(correlationModel.gradient));

        const equationText = `${Math.abs(correlationModel.gradient)} dollars ${correlationModel.gradient >= 0 ? 'gain' : 'loss'} per user increase`;
        const summaryText = `There is a <b>${quantifier} ${correlation}</b> linear correlation between active users and revenue (<b>${equationText}</b>)`;

        summaries.push({
          text: summaryText,
          validity: t
        });
      }
    }

    return summaries;
  });
}
