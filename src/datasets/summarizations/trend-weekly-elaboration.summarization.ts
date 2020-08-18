
import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import {
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
      detrendPoints: normalizedDetrendPoints,
    } = additiveDecomposition(normalizedYPoints, normalizedTrendPoints, ({ x }) => x.getDay());

    const uWeekend = (p: TimeSeriesPoint) => p.x.getDay() === 5 ? 0.2 : +(p.x.getDay() === 0 || p.x.getDay() === 6);
    const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);

    const isWeekend = (p: TimeSeriesPoint) => uWeekend(p) > 0.5;
    const isWeekday = (p: TimeSeriesPoint) => uWeekday(p) > 0.5;

    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const normalizedDetrendeekPointArrays = groupPointsByXWeek(normalizedDetrendPoints).filter(weekPoints => weekPoints.length >= 4);
    const nWeeks = normalizedDetrendeekPointArrays.length;

    const weekdayWeekendDiffPoints = normalizedDetrendeekPointArrays.map(weekPoints => {
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
    const isWeekdayWeekendEqual = weekdayWeekendEqualValidity > 0.7;

    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const weekPointArrays = groupPointsByXWeek(points).filter(weekPoints => weekPoints.length >= 4);

    // TODO: Create rate comparison summaries with fuzzy logic for both weekday and overall points
    const regressionResults = weekPointArrays.map(weekPoints => {
      if (isWeekdayWeekendEqual) {
        return linearRegression(weekPoints.map(timeSeriesPointToNumPoint));
      } else {
        return linearRegression(weekPoints.filter(isWeekday).map(timeSeriesPointToNumPoint));
      }
    });

    const ordinalTexts = ['first', 'second', 'third', 'fourth', 'fifth'];
    const summaries: Summary[] = [];

    for (let i = 0; i < nWeeks; i++) {
      const weekRate = regressionResults[i].gradient + 1e-4;
      const weekRateAbsolute = Math.abs(weekRate);
      const weekdayWeekendDescriptor = isWeekdayWeekendEqual ? '' : 'of weekdays ';

      const dynamicDescriptor = weekRate >= 0 ? 'increasing' : 'decreasing';

      const r2Text = `R2 = ${regressionResults[i].r2}`;
      const text = `The active users <b>${weekdayWeekendDescriptor}</b>in the <b>${ordinalTexts[i]} week</b> was <b>${dynamicDescriptor}</b> by <b>${formatY(weekRateAbsolute)}</b> users per day <b>(${r2Text})</b>.`;

      summaries.push({
        text,
        validity: 1.0,
      });
    }
    return summaries;
  });
}
