import * as math from 'mathjs';
import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
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

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    // The size of the chart is fixed to 800 * 500
    const MAX_ANGLE = Math.atan(500 / 800);
    const uQuicklyIncreasingLinearTrend = trapmfL(MAX_ANGLE / 2, MAX_ANGLE * 5 / 8);
    const uIncreasingLinearTrend = trapmf(MAX_ANGLE / 8, MAX_ANGLE / 4, MAX_ANGLE / 2, MAX_ANGLE * 5 / 8);
    const uConstantLinearTrend = trapmf(-MAX_ANGLE / 4, -MAX_ANGLE / 8, MAX_ANGLE / 8, MAX_ANGLE / 4);
    const uDecreasingLinearTrend = trapmf(-MAX_ANGLE * 5 / 8, -MAX_ANGLE / 2, -MAX_ANGLE / 4, -MAX_ANGLE / 8);
    const uQuicklyDecreasingLinearTrend = trapmfR(-MAX_ANGLE * 5 / 8, -MAX_ANGLE / 2);

    const uSmallRegressionError = trapmfR(0.75, 1.0);

    const uWeekend = (p: TimeSeriesPoint) => {
      const dayOfWeek = p.x.getDay();
      switch (dayOfWeek) {
        case 5: // Friday
          return 0.2;
        case 6: // Saturday
        case 0: // Sunday
          return 1;
        default: // All other days
          return 0;
      }
    };

    const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);

    const isWeekend = (p: TimeSeriesPoint) => uWeekend(p) > 0.5;
    const isWeekday = (p: TimeSeriesPoint) => uWeekday(p) > 0.5;

    const weekdayWeekendRatioPoints = groupPointsByXWeek(points).map(weekPoints => {
      const week = weekPoints[0].x;
      const wWeekdays = math.sum(weekPoints.map(uWeekday));
      const wWeekends = math.sum(weekPoints.map(uWeekend));
      const sWeekdays = math.sum(weekPoints.map(p => p.y * uWeekday(p)));
      const sWeekends = math.sum(weekPoints.map(p => p.y * uWeekend(p)));

      if (wWeekdays < 1e-7 || wWeekends < 1e-7) {
        return { x: week, y: -1 };
      } else {
        const avgWeekday = sWeekdays / wWeekdays;
        const avgWeekend = sWeekends / wWeekends;
        const weekdayWeekendRatio = avgWeekday / avgWeekend;
        return { x: week, y: weekdayWeekendRatio };
      }
    }).filter(({ y }) => y >= 0);

    const uMostPercentage = trapmfL(0.6, 0.7);
    const uEqualTraffic = ({ y }) => trapmf(0.8, 0.85, 1.15, 1.2)(y);
    const weekdayWeekendEqualValidity = sigmaCountQA(weekdayWeekendRatioPoints, uMostPercentage, uEqualTraffic);


    const uLinearTrends: [string, MembershipFunction][] = [
      ['quickly increasing', uQuicklyIncreasingLinearTrend],
      ['increasing', uIncreasingLinearTrend],
      ['constant', uConstantLinearTrend],
      ['decreasing', uDecreasingLinearTrend],
      ['quickly decreasing', uQuicklyDecreasingLinearTrend],
    ];

    const summaries: Summary[] = [];
    const normalizedPoints = normalizePoints(points.map(timeSeriesPointToNumPoint));
    const weekdayNormalizedPoints = normalizedPoints.filter((_, i) => isWeekday(points[i]));
    const weekendNormalizedPoints = normalizedPoints.filter((_, i) => isWeekend(points[i]));

    const overallLinearModel = linearRegression(normalizedPoints);
    const overallLinearTrendValidity = uSmallRegressionError(overallLinearModel.absoluteErrorStd);

    const weekdayLinearModel = linearRegression(weekdayNormalizedPoints);
    const weekdayLinearTrendValidity = uSmallRegressionError(weekdayLinearModel.absoluteErrorStd);

    const weekendLinearModel = linearRegression(weekendNormalizedPoints);
    const weekendLinearTrendValidity = uSmallRegressionError(weekendLinearModel.absoluteErrorStd);

    const overallLinearTrendSummariesValidity = Math.max(
      weekdayWeekendEqualValidity,
      ...uLinearTrends.map(([_, uLinearTrend]) =>
        Math.min(
          overallLinearTrendValidity,
          uLinearTrend(overallLinearModel.gradientAngleRad),
          weekdayLinearTrendValidity,
          uLinearTrend(weekdayLinearModel.gradientAngleRad),
          weekendLinearTrendValidity,
          uLinearTrend(weekendLinearModel.gradientAngleRad),
        )),
    );

    for (const [linearTrend, uLinearTrend] of uLinearTrends) {
      const validity = Math.min(
        overallLinearTrendSummariesValidity,
        overallLinearTrendValidity,
        uLinearTrend(overallLinearModel.gradientAngleRad),
      );
      const text = `The <b>overall</b> trend is <b>${linearTrend === 'constant' ? '' : 'linearly '}${linearTrend}</b>.`;
      summaries.push({
        validity,
        text,
      });
    }

    for (const [linearTrend, uLinearTrend] of uLinearTrends) {
      const validity = Math.min(
        1.0 - overallLinearTrendSummariesValidity,
        weekdayLinearTrendValidity,
        uLinearTrend(weekdayLinearModel.gradientAngleRad),
      );
      const text = `The <b>weekday</b> trend is <b>${linearTrend === 'constant' ? '' : 'linearly '}${linearTrend}</b>.`;
      summaries.push({
        validity,
        text,
      });
    }

    for (const [linearTrend, uLinearTrend] of uLinearTrends) {
      const validity = Math.min(
        1.0 - overallLinearTrendSummariesValidity,
        weekendLinearTrendValidity,
        uLinearTrend(weekendLinearModel.gradientAngleRad),
      );
      const text = `The <b>weekend</b> trend is <b>${linearTrend === 'constant' ? '' : 'linearly '}${linearTrend}</b>.`;
      summaries.push({
        validity,
        text,
      });
    }

    return summaries;
  });
}
