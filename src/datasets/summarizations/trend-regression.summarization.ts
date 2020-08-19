
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
import { formatY } from '../../utils/formatters';

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

    const ANGMX = Math.PI / 2;
    const uQuicklyIncreasingLinearTrend = trapmfL(ANGMX / 2, ANGMX * 5 / 8);
    const uIncreasingLinearTrend = trapmf(ANGMX / 16, ANGMX / 8, ANGMX / 2, ANGMX * 5 / 8);
    const uConstantLinearTrend = trapmf(-ANGMX / 8, -ANGMX / 16, ANGMX / 16, ANGMX / 8);
    const uDecreasingLinearTrend = trapmf(-ANGMX * 5 / 8, -ANGMX / 2, -ANGMX / 8, -ANGMX / 16);
    const uQuicklyDecreasingLinearTrend = trapmfR(-ANGMX * 5 / 8, -ANGMX / 2);

    const uSmallRegressionStd = trapmfR(0.09, 0.14);

    const uLinearTrends: [string, MembershipFunction][] = [
      ['quickly increasing', uQuicklyIncreasingLinearTrend],
      ['increasing', uIncreasingLinearTrend],
      ['constant', uConstantLinearTrend],
      ['decreasing', uDecreasingLinearTrend],
      ['quickly decreasing', uQuicklyDecreasingLinearTrend],
    ];

    // TODO: Move denormalization information to normalization utils
    const ymin = 0;
    const ymax = Math.max(...points.map(({ y }) => y));
    const xdiff = 800 / 500 / points.length;
    const denormalizeGradient = g => (g * xdiff) * (ymax - ymin) - ymin;

    const normalizedPoints = normalizePoints(points.map(timeSeriesPointToNumPoint));
    const weekdayNormalizedPoints = normalizedPoints.filter((_, i) => isWeekday(points[i]));
    const weekendNormalizedPoints = normalizedPoints.filter((_, i) => isWeekend(points[i]));

    const overallLinearModel = linearRegression(normalizedPoints);
    const overallLinearTrendValidity = uSmallRegressionStd(overallLinearModel.errorStd);

    const weekdayLinearModel = linearRegression(weekdayNormalizedPoints);
    const weekdayLinearTrendValidity = uSmallRegressionStd(weekdayLinearModel.errorStd);

    const weekendLinearModel = linearRegression(weekendNormalizedPoints);
    const weekendLinearTrendValidity = uSmallRegressionStd(weekendLinearModel.errorStd);

    const overallLinearTrendSummariesValidity = weekdayWeekendEqualValidity;

    const summaries: Summary[] = [];
    for (const [linearTrend, uLinearTrend] of uLinearTrends) {
      const validity = Math.min(
        overallLinearTrendSummariesValidity,
        overallLinearTrendValidity,
        uLinearTrend(overallLinearModel.gradientAngleRad),
      );
      const rate = denormalizeGradient(overallLinearModel.gradient);
      const rateAbsolute = Math.abs(rate);

      let text;
      if (linearTrend === 'constant') {
        text = `The <b>overall</b> active users <b>remained similar</b>.`;
      } else {
        text = `The <b>overall</b> active users was <b>linearly ${linearTrend}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
      }
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
      const rate = denormalizeGradient(weekdayLinearModel.gradient);
      const rateAbsolute = Math.abs(rate);

      let text;
      if (linearTrend === 'constant') {
        text = `The active users <b>of weekdays</b> <b>remained similar</b>.`;
      } else {
        text = `The active users <b>of weekdays</b> was <b>linearly ${linearTrend}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
      }
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
      const rate = denormalizeGradient(weekendLinearModel.gradient);
      const rateAbsolute = Math.abs(rate);

      let text;
      if (linearTrend === 'constant') {
        text = `The active users <b>of weekends</b> <b>remained similar</b>.`;
      } else {
        text = `The active users <b>of weekends</b> was <b>linearly ${linearTrend}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
      }
      summaries.push({
        validity,
        text,
      });
    }

    return summaries;
  });
}
