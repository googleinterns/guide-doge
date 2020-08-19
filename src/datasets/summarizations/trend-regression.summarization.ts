
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
  centeredMovingAverage,
  additiveDecomposition,
} from './libs/trend';
import {
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
} from './utils/time-series';
import {
  normalizePoints,
  normalizePointsY,
} from './utils/commons';
import { sum } from '../../utils/misc';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const normalizedYPoints = normalizePointsY(points);

    const centeredMovingAverageHalfWindowSize = 4;
    const normalizedTrendPoints = centeredMovingAverage(normalizedYPoints, centeredMovingAverageHalfWindowSize);
    const {
      seasonPoints: normalizedSeasonPoints,
    } = additiveDecomposition(normalizedYPoints, normalizedTrendPoints, ({ x }) => x.getDay());

    const uWeekend = (p: TimeSeriesPoint) => p.x.getDay() === 5 ? 0.2 : +(p.x.getDay() === 0 || p.x.getDay() === 6);
    const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);

    const isWeekend = (p: TimeSeriesPoint) => uWeekend(p) > 0.5;
    const isWeekday = (p: TimeSeriesPoint) => uWeekday(p) > 0.5;

    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const normalizedSeasonWeekPointArrays = groupPointsByXWeek(normalizedSeasonPoints).filter(weekPoints => weekPoints.length >= 4);

    const weekdayWeekendDiffPoints = normalizedSeasonWeekPointArrays.map(weekPoints => {
      const week = weekPoints[0].x;
      const weekdayPoints = weekPoints.filter(isWeekday);
      const weekendPoints = weekPoints.filter(isWeekend);
      const weekdayPointsYSum = sum(weekdayPoints.map(({ y }) => y));
      const weekendPointsYSum = sum(weekdayPoints.map(({ y }) => y));

      if (weekdayPoints.length === 0 || weekendPoints.length === 0) {
        return { x: week, y: -1 };
      } else {
        const weekdayPointsYAverage = weekdayPointsYSum / weekdayPoints.length;
        const weekendPointsYAverage = weekendPointsYSum / weekendPoints.length;
        const weekdayWeekendDiff = Math.abs(weekdayPointsYAverage - weekendPointsYAverage);
        return { x: week, y: weekdayWeekendDiff };
      }
    }).filter(({ y }) => y >= 0);

    const uMostPercentage = trapmfL(0.6, 0.7);
    const uEqualDiff = ({ y }) => trapmfR(0.05, 0.1)(y);
    const weekdayWeekendEqualValidity = sigmaCountQA(weekdayWeekendDiffPoints, uMostPercentage, uEqualDiff);

    const ANGMX = Math.atan(500 / 800);
    const uQuicklyIncreasingLinearTrend = trapmfL(ANGMX / 2, ANGMX * 5 / 8);
    const uIncreasingLinearTrend = trapmf(ANGMX / 8, ANGMX / 4, ANGMX / 2, ANGMX * 5 / 8);
    const uConstantLinearTrend = trapmf(-ANGMX / 4, -ANGMX / 8, ANGMX / 8, ANGMX / 4);
    const uDecreasingLinearTrend = trapmf(-ANGMX * 5 / 8, -ANGMX / 2, -ANGMX / 4, -ANGMX / 8);
    const uQuicklyDecreasingLinearTrend = trapmfR(-ANGMX * 5 / 8, -ANGMX / 2);

    const uSmallRegressionError = trapmfR(0.75, 1.0);

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
