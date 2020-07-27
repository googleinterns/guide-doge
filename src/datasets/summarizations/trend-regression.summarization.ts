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
    const weekdayNormalizedPoints = normalizedPoints.filter((_, i) => isWeekday(points[i]));
    const weekendNormalizedPoints = normalizedPoints.filter((_, i) => isWeekend(points[i]));

    const overallLinearModel = regression.linear(normalizedPoints.map(pointToPair));
    const overallLinearTrendValidity = calLinearTrendValidity(normalizedPoints, overallLinearModel);

    const weekdayLinearModel = regression.linear(weekdayNormalizedPoints.map(pointToPair));
    const weekdayLinearTrendValidity = calLinearTrendValidity(weekdayNormalizedPoints, weekdayLinearModel);

    const weekendLinearModel = regression.linear(weekendNormalizedPoints.map(pointToPair));
    const weekendLinearTrendValidity = calLinearTrendValidity(weekendNormalizedPoints, weekendLinearModel);

    // The size of the chart is fixed to 800 * 500
    const ANGMX = Math.atan(500 / 800);
    const uQuicklyIncreasingLinearTrend = trapmfL(ANGMX * 3 / 8, ANGMX / 2);
    const uIncreasingLinearTrend = trapmf(ANGMX / 8, ANGMX / 4, ANGMX * 3 / 8, ANGMX / 2);
    const uConstantLinearTrend = trapmf(-ANGMX / 4, -ANGMX / 8, ANGMX / 8, ANGMX / 4);
    const uDecreasingLinearTrend = trapmf(-ANGMX / 2, -ANGMX * 3 / 8, -ANGMX / 4, -ANGMX / 8);
    const uQuicklyDecreasingLinearTrend = trapmfR(-ANGMX / 2, -ANGMX * 3 / 8);

    const uLinearTrends: [string, MembershipFunction][] = [
      ['quickly increasing', uQuicklyIncreasingLinearTrend],
      ['increasing', uIncreasingLinearTrend],
      ['constant', uConstantLinearTrend],
      ['decreasing', uDecreasingLinearTrend],
      ['quickly decreasing', uQuicklyDecreasingLinearTrend],
    ];

    const overallLinearTrendSummariesValidity = Math.max(
      weekdayWeekendEqualValidity,
      ...uLinearTrends.map(([_, uLinearTrend]) =>
        Math.min(
          overallLinearTrendValidity,
          uLinearTrend(getLinearModelAngle(overallLinearModel)),
          weekdayLinearTrendValidity,
          uLinearTrend(getLinearModelAngle(weekdayLinearModel)),
          weekendLinearTrendValidity,
          uLinearTrend(getLinearModelAngle(weekendLinearModel)),
        )),
    );

    for (const [linearTrend, uLinearTrend] of uLinearTrends) {
      const validity = Math.min(
        overallLinearTrendSummariesValidity,
        overallLinearTrendValidity,
        uLinearTrend(getLinearModelAngle(overallLinearModel)),
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
        uLinearTrend(getLinearModelAngle(weekdayLinearModel)),
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
        uLinearTrend(getLinearModelAngle(weekendLinearModel)),
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

function pointToPair<X, Y>(p: XYPoint<X, Y>): [X, Y] {
  return [p.x, p.y];
}

function getLinearModelAngle(model: { equation: [number, number] }) {
  return Math.atan(getLinearModelGardient(model));
}

function getLinearModelGardient(model: { equation: [number, number] }) {
  return model.equation[0];
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

function uSmallRegressionError(v) {
  return trapmfR(0.15, 0.2)(v * 2);
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
