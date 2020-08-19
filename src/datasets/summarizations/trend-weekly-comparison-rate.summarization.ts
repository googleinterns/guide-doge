
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
      seasonPoints: normalizedSeasonPoints,
    } = additiveDecomposition(normalizedYPoints, normalizedTrendPoints, ({ x }) => x.getDay());

    const uWeekend = (p: TimeSeriesPoint) => p.x.getDay() === 5 ? 0.2 : +(p.x.getDay() === 0 || p.x.getDay() === 6);
    const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);

    const isWeekend = (p: TimeSeriesPoint) => uWeekend(p) > 0.5;
    const isWeekday = (p: TimeSeriesPoint) => uWeekday(p) > 0.5;

    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const normalizedSeasonWeekPointArrays = groupPointsByXWeek(normalizedSeasonPoints).filter(weekPoints => weekPoints.length >= 4);
    const nWeeks = normalizedSeasonWeekPointArrays.length;

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

    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const weekPointArrays = groupPointsByXWeek(points).filter(weekPoints => weekPoints.length >= 4);

    // TODO: Create rate comparison summaries with fuzzy logic for both weekday and overall points
    const regressionResults = weekPointArrays.map(weekPoints => {
      if (weekdayWeekendEqualValidity > 0.7) {
        return linearRegression(weekPoints.map(timeSeriesPointToNumPoint));
      } else {
        return linearRegression(weekPoints.filter(isWeekday).map(timeSeriesPointToNumPoint));
      }
    });

    const ordinalTexts = ['first', 'second', 'third', 'fourth', 'fifth'];
    const summaries: Summary[] = [];

    for (let i = 0; i < nWeeks - 1; i++) {
      console.log(regressionResults[i].gradient, regressionResults[i + 1].gradient)
      const currWeekRate = regressionResults[i].gradient + 1e-4;
      const nextWeekRate = regressionResults[i + 1].gradient + 1e-4;
      const rateDiff = nextWeekRate - currWeekRate;
      const rateDiffAbsolute  = Math.abs(rateDiff);

      const weekdayWeekendDescriptor = weekdayWeekendEqualValidity > 0.7 ? '' : 'of weekdays ';

      if (rateDiffAbsolute > 2 && currWeekRate * nextWeekRate < 0) {
        const getDynamicDescriptor = (v) => v >= 0 ? 'increasing' : 'decreasing';
        const text = `The active users <b>${weekdayWeekendDescriptor}</b>was <b>${getDynamicDescriptor(nextWeekRate)}</b> in the <b>${ordinalTexts[i + 1]} week</b> but <b>${getDynamicDescriptor(currWeekRate)}</b> in the <b>${ordinalTexts[i]} week</b>.`;
        summaries.push({
          text,
          validity: 1.0,
        });
      } else {
        const percentageIncrease = rateDiff / currWeekRate * 100;
        const precentageChangeDescriptor = percentageIncrease >= 0 ? 'more' : 'less';
        const percentageChangeDynamicDescriptor = percentageIncrease >= 0 ? 'faster' : 'slower';

        const percentageChangeAbsolute = Math.abs(percentageIncrease);
        const percentageChangeText = percentageChangeAbsolute > 5 && rateDiffAbsolute > 2
          ? `${formatY(percentageChangeAbsolute)}% (${formatY(rateDiffAbsolute)} ${precentageChangeDescriptor} user increase per day) ${percentageChangeDynamicDescriptor} than`
          : 'in the same rate as';


        const text = `The active users <b>${weekdayWeekendDescriptor}</b>in the <b>${ordinalTexts[i + 1]} week</b> grew <b>${percentageChangeText}</b> the <b>${ordinalTexts[i]} week</b>.`;

        summaries.push({
          text,
          validity: 1.0,
        });
      }
    }

    return [{
      name: 'Weekly Comparison - Rate',
      summaries
    }];
  });
}
