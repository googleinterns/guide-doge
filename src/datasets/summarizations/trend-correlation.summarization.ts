
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

    const ANGMX = Math.atan(500 / 800);
    const uPositiveCorrelated = trapmfL(-ANGMX / 8, ANGMX / 8);
    const uNegativeCorrelated = trapmfR(-ANGMX / 8, ANGMX / 8);
    const uSmall = trapmfR(0.5, 0.6);
    const uLarge = trapmf(0.5, 0.6, 0.9, 0.95);
    const uPerfect = trapmfL(0.9, 0.95);

    const uCorrelations: [string, MembershipFunction][] = [
      ['small', uSmall],
      ['large', uLarge],
      ['perfect', uPerfect]
    ];

    const uDirections: [string, MembershipFunction][] = [
      ['positive', uPositiveCorrelated],
      ['negative', uNegativeCorrelated],
    ];

    const correlationModel = linearRegression(activeUserRevenuePoints);
    const summaries: Summary[] = [];
    for (const [correlation, uCorrelation] of uCorrelations) {
      for (const [direction, uDirection] of uDirections) {
        const t = Math.min(uCorrelation(correlationModel.r2), uDirection(correlationModel.gradient));
        const equation = `Revenue = ${correlationModel.gradient} * ActiveUsers ${correlationModel.yIntercept >= 0 ? '+' : '-'} ${Math.abs(correlationModel.yIntercept)}`;
        summaries.push({
          text: `There is <b>${correlation} ${direction}</b> linear association between active users and revenue <b>(${equation}, R2=${correlationModel.r2})</b>.`,
          validity: t
        });
      }
    }

    return summaries;
  });
}
