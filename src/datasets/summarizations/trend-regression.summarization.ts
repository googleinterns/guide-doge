import regression from 'regression';
import * as math from 'mathjs';
import { Summary } from './types';
import { TimeSeriesPoint } from '../queries/time-series.query';
import { cacheSummaries } from './utils/commons';
import {
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from './libs/protoform';
import {
  normalizeNumPoints,
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
  NumPoint,
} from './utils/time-series';
import { XYPoint } from '../metas/types';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const summaries: Summary[] = [];
    const normalizedPoints = normalizeNumPoints(points.map(timeSeriesPointToNumPoint));
    const weekdayWeekendEqualValidity = calWeekdayWeekendEqualValidity(points);

    const HPI = Math.PI / 2;
    const uQuicklyIncreasingLinearTrend = trapmfL(HPI / 2, HPI * 3 / 5);
    const uIncreasingLinearTrend = trapmfL(HPI / 8, HPI / 4);
    const uConstantLinearTrend = trapmf(-HPI / 4, -HPI / 8, HPI / 8, HPI / 4);
    const uDecreasingLinearTrend = trapmfR(-HPI / 4, -HPI / 8);
    const uQuicklyDecreasingLinearTrend = trapmfR(-HPI * 3 / 5, -HPI / 2);

    const uLinearTrends: [string, MembershipFunction][] = [
      ['quickly increasing', uQuicklyIncreasingLinearTrend],
      ['increasing', uIncreasingLinearTrend],
      ['constant', uConstantLinearTrend],
      ['decreasing', uDecreasingLinearTrend],
      ['quickly decreasing', uQuicklyDecreasingLinearTrend],
    ];

    const overallLinearModel = regression.linear(normalizedPoints.map(pointToPair));
    const overallLinearTrendValidity = calLinearTrendValidity(normalizedPoints, overallLinearModel);
    for (const [linearTrend, uLinearTrend] of uLinearTrends) {
      const linearModelAngleRad = Math.atan(overallLinearModel.equation[0]);
      const validity = Math.min(
        weekdayWeekendEqualValidity,
        overallLinearTrendValidity,
        uLinearTrend(linearModelAngleRad),
      );
      summaries.push({
        validity,
        text: `The <b>overall</b> trend is <b>${linearTrend === 'constant' ? '' : 'linearly '}${linearTrend}</b>.`,
      });
    }

    const weekdayNormalizedPoints = normalizedPoints.filter((_, i) => isWeekday(points[i]));
    const weekdayLinearModel = regression.linear(weekdayNormalizedPoints.map(pointToPair));
    const weekdayLinearTrendValidity = calLinearTrendValidity(weekdayNormalizedPoints, weekdayLinearModel);
    for (const [linearTrend, uLinearTrend] of uLinearTrends) {
      const linearModelAngleRad = Math.atan(weekdayLinearModel.equation[0]);
      const validity = Math.min(
        1.0 - weekdayWeekendEqualValidity,
        weekdayLinearTrendValidity,
        uLinearTrend(linearModelAngleRad),
      );
      summaries.push({
        validity,
        text: `The <b>weekday</b> trend is <b>${linearTrend === 'constant' ? '' : 'linearly '}${linearTrend}</b>.`,
      });
    }


    const weekendNormalizedPoints = normalizedPoints.filter((_, i) => isWeekend(points[i]));
    const weekendLinearModel = regression.linear(weekendNormalizedPoints.map(pointToPair));
    const weekendLinearTrendValidity = calLinearTrendValidity(weekendNormalizedPoints, weekendLinearModel);
    for (const [linearTrend, uLinearTrend] of uLinearTrends) {
      const linearModelAngleRad = Math.atan(weekendLinearModel.equation[0]);
      const validity = Math.min(
        1.0 - weekdayWeekendEqualValidity,
        weekendLinearTrendValidity,
        uLinearTrend(linearModelAngleRad),
      );
      summaries.push({
        validity,
        text: `The <b>weekend</b> trend is <b>${linearTrend === 'constant' ? '' : 'linearly '}${linearTrend}</b>.`,
      });
    }

    return summaries;
  });
}

function calLinearTrendValidity(points: NumPoint[], model: { equation: [number, number] }) {
  // Linear regression: y = mx + c
  const [m, c] = model.equation;
  const errors = points.map(({ x, y }) => {
    const yEstimated = m * x + c;
    return math.abs(y - yEstimated);
  });
  const std = math.std(errors);

  return uSmallRegressionError(std);
}

function pointToPair<X, Y>(p: XYPoint<X, Y>): [X, Y] {
  return [p.x, p.y];
}

function uSmallRegressionError(v) {
  return trapmfR(0.09, 0.13)(v * 2);
}

function calWeekdayWeekendEqualValidity(points: TimeSeriesPoint[]): number {
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

  const uMostPercentage = trapmfL(0.6, 0.7);
  const uEqualTraffic = ({ y }) => trapmf(0.6, 0.8, 1.2, 1.4)(y);
  return sigmaCountQA(points, uMostPercentage, uEqualTraffic);
}

function uWeekend(p: TimeSeriesPoint) {
  return p.x.getDay() === 5 ? 0.2 : +(p.x.getDay() === 0 || p.x.getDay() === 6);
}

function uWeekday(p: TimeSeriesPoint) {
  return 1 - uWeekend(p);
}

function isWeekend(p: TimeSeriesPoint) {
  return uWeekend(p) > 0.5;
}

function isWeekday(p: TimeSeriesPoint) {
  return uWeekday(p) > 0.5;
}
