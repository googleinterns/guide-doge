import * as math from 'mathjs';
import { Summary, SummaryVariableOptionPair } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import { formatY } from '../../utils/formatters';
import {
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from './libs/protoform';
import {
  additiveDecomposite,
  createLinearModel,
  createCenteredMovingAveragePoints,
} from './libs/trend';
import {
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
} from './utils/time-series';
import {
  normalizePoints,
  normalizePointsY,
} from './utils/commons';
import { chartDiagonalAngle } from './utils/constants';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const uQuicklyIncreasingLinearDynamic = trapmfL(chartDiagonalAngle / 2, chartDiagonalAngle * 5 / 8);
    const uIncreasingLinearDynamic = trapmf(
      chartDiagonalAngle / 8, chartDiagonalAngle / 4, chartDiagonalAngle / 2, chartDiagonalAngle * 5 / 8);
    const uConstantLinearDynamic = trapmf(-chartDiagonalAngle / 4, -chartDiagonalAngle / 8, chartDiagonalAngle / 8, chartDiagonalAngle / 4);
    const uDecreasingLinearDynamic = trapmf(
      -chartDiagonalAngle * 5 / 8, -chartDiagonalAngle / 2, -chartDiagonalAngle / 4, -chartDiagonalAngle / 8);
    const uQuicklyDecreasingLinearDynamic = trapmfR(-chartDiagonalAngle * 5 / 8, -chartDiagonalAngle / 2);

    const uSmallRegressionStd = trapmfR(0.09, 0.14);

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

    const normalizedYPoints = normalizePointsY(points);

    const centeredMovingAverageHalfWindowSize = 4;
    const normalizedTrendPoints = createCenteredMovingAveragePoints(normalizedYPoints, centeredMovingAverageHalfWindowSize);
    const {
      seasonalPoints: normalizedSeasonalPoints,
    } = additiveDecomposite(normalizedYPoints, normalizedTrendPoints, ({ x }) => x.getDay());

    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const normalizedSeasonWeekPointArrays = groupPointsByXWeek(normalizedSeasonalPoints).filter(weekPoints => weekPoints.length >= 4);

    // Create an array of weekly points, where the y-value is the diff | AverageWeekdayY - AverageWeekendY | of each week
    // The x-value is the time(x-value) of the first point in the week. If a week does not have any weekday points or
    // weekend points, e.g. first week and last week of a month, the created weekly points will not include that week.
    const weekdayWeekendDiffPoints = normalizedSeasonWeekPointArrays.map(weekPoints => {
      const startDateOfWeek = weekPoints[0].x;
      const weekdayPoints = weekPoints.filter(isWeekday);
      const weekendPoints = weekPoints.filter(isWeekend);
      const weekdayPointsYSum = math.sum(weekdayPoints.map(({ y }) => y));
      const weekendPointsYSum = math.sum(weekdayPoints.map(({ y }) => y));

      if (weekdayPoints.length === 0 || weekendPoints.length === 0) {
        return { x: startDateOfWeek, y: null };
      } else {
        const weekdayPointsYAverage = weekdayPointsYSum / weekdayPoints.length;
        const weekendPointsYAverage = weekendPointsYSum / weekendPoints.length;
        const weekdayWeekendDiff = Math.abs(weekdayPointsYAverage - weekendPointsYAverage);
        return { x: startDateOfWeek, y: weekdayWeekendDiff };
      }
    }).filter(({ y }) => y !== null) as TimeSeriesPoint[];

    const uMostPercentage = trapmfL(0.6, 0.7);
    const uEqualDiff = ({ y }) => trapmfR(0.05, 0.1)(y);
    const weekdayWeekendEqualValidity = sigmaCountQA(weekdayWeekendDiffPoints, uMostPercentage, uEqualDiff);

    const uLinearDynamics: SummaryVariableOptionPair<MembershipFunction>[] = [
      ['quickly increasing', uQuicklyIncreasingLinearDynamic],
      ['increasing', uIncreasingLinearDynamic],
      ['constant', uConstantLinearDynamic],
      ['decreasing', uDecreasingLinearDynamic],
      ['quickly decreasing', uQuicklyDecreasingLinearDynamic],
    ];

    // TODO: Move denormalization information to normalization utils
    const ymin = 0;
    const ymax = Math.max(...points.map(({ y }) => y));
    const xdiff = 800 / 500 / points.length;
    const denormalizeGradient = gradient => (gradient * xdiff) * (ymax - ymin) - ymin;

    const normalizedPoints = normalizePoints(points.map(timeSeriesPointToNumPoint));
    const weekdayNormalizedPoints = normalizedPoints.filter((_, i) => isWeekday(points[i]));
    const weekendNormalizedPoints = normalizedPoints.filter((_, i) => isWeekend(points[i]));

    const overallLinearModel = createLinearModel(normalizedPoints);
    const overallLinearTrendValidity = uSmallRegressionStd(overallLinearModel.errorStd);

    const weekdayLinearModel = createLinearModel(weekdayNormalizedPoints);
    const weekdayLinearTrendValidity = uSmallRegressionStd(weekdayLinearModel.errorStd);

    const weekendLinearModel = createLinearModel(weekendNormalizedPoints);
    const weekendLinearTrendValidity = uSmallRegressionStd(weekendLinearModel.errorStd);

    const overallLinearTrendSummariesValidity = weekdayWeekendEqualValidity;

    const summaries: Summary[] = [];
    // Create summaries describing linear trend of overall points
    for (const [linearDynamic, uLinearDynamic] of uLinearDynamics) {
      const validity = Math.min(
        overallLinearTrendSummariesValidity,
        overallLinearTrendValidity,
        uLinearDynamic(overallLinearModel.gradientAngleRad),
      );
      const rate = denormalizeGradient(overallLinearModel.gradient);
      const rateAbsolute = Math.abs(rate);

      let text;
      if (linearDynamic === 'constant') {
        text = `The <b>overall</b> active users <b>remained similar</b>.`;
      } else {
        text = `The <b>overall</b> active users was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
      }
      summaries.push({
        validity,
        text,
      });
    }

    // Create summaries describing linear trend of weekday points
    for (const [linearDynamic, uLinearDynamic] of uLinearDynamics) {
      const validity = Math.min(
        1.0 - overallLinearTrendSummariesValidity,
        weekdayLinearTrendValidity,
        uLinearDynamic(weekdayLinearModel.gradientAngleRad),
      );
      const rate = denormalizeGradient(weekdayLinearModel.gradient);
      const rateAbsolute = Math.abs(rate);

      let text;
      if (linearDynamic === 'constant') {
        text = `The active users <b>of weekdays</b> <b>remained similar</b>.`;
      } else {
        text = `The active users <b>of weekdays</b> was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
      }
      summaries.push({
        validity,
        text,
      });
    }

    // Create summaries describing linear trend of weekend points
    for (const [linearDynamic, uLinearDynamic] of uLinearDynamics) {
      const validity = Math.min(
        1.0 - overallLinearTrendSummariesValidity,
        weekendLinearTrendValidity,
        uLinearDynamic(weekendLinearModel.gradientAngleRad),
      );
      const rate = denormalizeGradient(weekendLinearModel.gradient);
      const rateAbsolute = Math.abs(rate);

      let text;
      if (linearDynamic === 'constant') {
        text = `The active users <b>of weekends</b> <b>remained similar</b>.`;
      } else {
        text = `The active users <b>of weekends</b> was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
      }
      summaries.push({
        validity,
        text,
      });
    }

    return summaries;
  });
}
