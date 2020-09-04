import * as math from 'mathjs';
import { Summary, SummaryVariableOptionPair } from './types';
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
  createLinearModel,
} from './libs/trend';
import {
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
} from './utils/time-series';
import {
  normalizePoints
} from './utils/commons';
import { chartDiagonalAngle } from './utils/constants';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const uQuicklyIncreasingLinearTrend = trapmfL(chartDiagonalAngle / 2, chartDiagonalAngle * 5 / 8);
    const uIncreasingLinearTrend = trapmf(
      chartDiagonalAngle / 8, chartDiagonalAngle / 4, chartDiagonalAngle / 2, chartDiagonalAngle * 5 / 8);
    const uConstantLinearTrend = trapmf(-chartDiagonalAngle / 4, -chartDiagonalAngle / 8, chartDiagonalAngle / 8, chartDiagonalAngle / 4);
    const uDecreasingLinearTrend = trapmf(
      -chartDiagonalAngle * 5 / 8, -chartDiagonalAngle / 2, -chartDiagonalAngle / 4, -chartDiagonalAngle / 8);
    const uQuicklyDecreasingLinearTrend = trapmfR(-chartDiagonalAngle * 5 / 8, -chartDiagonalAngle / 2);

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

    // Create an array of weekly points, where the y-value is the ratio AverageWeekdayY / AverageWeekendY of each week
    // The x-value is the time(x-value) of the first point in the week. If a week does not have any weekday points or
    // weekend points, e.g. first week and last week of a month, the created weekly points will not include that week.
    const weekdayWeekendRatioPoints = groupPointsByXWeek(points).map(weekPoints => {
      const startDateOfWeek = weekPoints[0].x;
      // The weights are the membership degree values of weekday and weekend
      const weekdayWeightSum = math.sum(weekPoints.map(uWeekday));
      const weekendWeightSum = math.sum(weekPoints.map(uWeekend));
      const weightedWeekdayYSum = math.sum(weekPoints.map(p => p.y * uWeekday(p)));
      const weightedWeekendYSum = math.sum(weekPoints.map(p => p.y * uWeekend(p)));

      if (weekdayWeightSum < 1e-7 || weekendWeightSum < 1e-7) {
        // No weekday points or weekend points in this week
        return { x: startDateOfWeek, y: null };
      } else {
        const weightedWeekdayYAverage = weightedWeekdayYSum / weekdayWeightSum;
        const weightedWeekendYAverage = weightedWeekendYSum / weekendWeightSum;
        const weekdayWeekendRatio = weightedWeekdayYAverage / weightedWeekendYAverage;
        return { x: startDateOfWeek, y: weekdayWeekendRatio };
      }
    }).filter(({ y }) => y !== null) as TimeSeriesPoint[];

    const uMostPercentage = trapmfL(0.6, 0.7);
    const uEqualTraffic = ({ y }) => trapmf(0.8, 0.85, 1.15, 1.2)(y);
    const weekdayWeekendEqualValidity = sigmaCountQA(weekdayWeekendRatioPoints, uMostPercentage, uEqualTraffic);


    const uLinearTrends: SummaryVariableOptionPair<MembershipFunction>[] = [
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

    const overallLinearModel = createLinearModel(normalizedPoints);
    const overallLinearTrendValidity = uSmallRegressionError(overallLinearModel.absoluteErrorStd);

    const weekdayLinearModel = createLinearModel(weekdayNormalizedPoints);
    const weekdayLinearTrendValidity = uSmallRegressionError(weekdayLinearModel.absoluteErrorStd);

    const weekendLinearModel = createLinearModel(weekendNormalizedPoints);
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

    // Create summaries describing linear trend of overall points
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

    // Create summaries describing linear trend of weekday points
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

    // Create summaries describing linear trend of weekend points
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
