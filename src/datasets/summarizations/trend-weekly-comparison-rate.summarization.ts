import * as math from 'mathjs';
import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import {
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from './libs/protoform';
import {
  createLinearModel,
  createCenteredMovingAveragePoints,
  additiveDecomposite,
} from './libs/trend';
import {
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
} from './utils/time-series';
import {
  normalizePointsY,
} from './utils/commons';
import { formatY } from '../../utils/formatters';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {

    const normalizedYPoints = normalizePointsY(points);

    const centeredMovingAverageHalfWindowSize = 4;
    const normalizedTrendPoints = createCenteredMovingAveragePoints(normalizedYPoints, centeredMovingAverageHalfWindowSize);
    const {
      detrendedPoints: normalizedDetrendedPoints,
    } = additiveDecomposite(normalizedYPoints, normalizedTrendPoints, ({ x }) => x.getDay());

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

    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const normalizedDetrendedWeekPointArrays = groupPointsByXWeek(normalizedDetrendedPoints).filter(weekPoints => weekPoints.length >= 4);
    const numOfWeeks = normalizedDetrendedWeekPointArrays.length;

    const weekdayWeekendDiffPoints = normalizedDetrendedWeekPointArrays.map(weekPoints => {
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

    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const weekPointArrays = groupPointsByXWeek(points).filter(weekPoints => weekPoints.length >= 4);

    // TODO: Create rate comparison summaries with fuzzy logic for both weekday and overall points
    const weekLinearModels = weekPointArrays.map(weekPoints => {
      if (weekdayWeekendEqualValidity > 0.7) {
        return createLinearModel(weekPoints.map(timeSeriesPointToNumPoint));
      } else {
        return createLinearModel(weekPoints.filter(isWeekday).map(timeSeriesPointToNumPoint));
      }
    });

    const ordinalTexts = ['first', 'second', 'third', 'fourth', 'fifth'];
    const summaries: Summary[] = [];

    for (let i = 0; i < numOfWeeks - 1; i++) {
      const eps = 1e-4;
      const currentWeekRate = weekLinearModels[i].gradient + eps;
      const nextWeekRate = weekLinearModels[i + 1].gradient + eps;
      const rateDiff = nextWeekRate - currentWeekRate;
      const rateDiffAbsolute = Math.abs(rateDiff);

      const weekdayWeekendDescriptor = weekdayWeekendEqualValidity > 0.7 ? '' : 'of weekdays ';

      if (rateDiffAbsolute > 2 && currentWeekRate * nextWeekRate < 0) {
        const getDynamicDescriptor = (v) => v >= 0 ? 'increasing' : 'decreasing';
        const text = `The active users <b>${weekdayWeekendDescriptor}</b>was <b>${getDynamicDescriptor(nextWeekRate)}</b> in the <b>${ordinalTexts[i + 1]} week</b> but <b>${getDynamicDescriptor(currentWeekRate)}</b> in the <b>${ordinalTexts[i]} week</b>.`;
        summaries.push({
          text,
          validity: 1.0,
        });
      } else {
        const percentageIncrease = rateDiff / currentWeekRate * 100;
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
    return summaries;
  });
}
