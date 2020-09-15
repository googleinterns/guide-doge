
import * as math from 'mathjs';
import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import {
  trapmf,
  trapmfL,
  trapmfR,
  PointMembershipFunction,
} from './libs/protoform';
import {
  additiveDecomposite,
  createPartialTrends,
  mapConeAngle,
  mergePartialTrends,
  TimeSeriesPartialTrend,
} from './libs/trend';
import {
  groupPointsByXWeek,
} from './utils/time-series';
import {
  NormalizedYPoint,
  normalizePointsY,
} from './utils/commons';
import { CHART_DIAGONAL_ANGLE } from './utils/constants';
import { formatY } from '../../utils/formatters';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    // TODO: Move denormalization information to normalization utils
    const ymin = 0;
    const ymax = Math.max(...points.map(({ y }) => y));
    const denormalizeY = ({ x, y }) => ({ x, y: y * (ymax - ymin) - ymin });

    // Only consider weeks with Monday as the first day when creating summaries
    const normalizedYWeekPointArrays = groupPointsByXWeek(normalizePointsY(points))
      .filter(weekPoints => weekPoints[0].x.getDay() === 1)
      .map(weekPoints => {
        const mondayY = weekPoints[0].y;
        const normalizedWeekPoints = weekPoints.map(({ x, y }) => ({ x, y: y - mondayY }));
        return normalizedWeekPoints;
      });

    const normalizedPoints = normalizedYWeekPointArrays.flat();
    const zeroPoints = normalizedPoints.map(({ x }) => ({ x, y: 0 }));
    const {
      seasonalPoints: normalizedYSeasonalPoints,
      residualPoints: normalizedYResidualPoints,
    } = additiveDecomposite(normalizedPoints, zeroPoints, ({ x }) => x.getDay());

    const uSmallEstimationResidualStd = trapmfR(0.075, 0.1);
    const residualStd = math.std(normalizedYResidualPoints.map(({ y }) => y));
    const weeklyPatternValidity = uSmallEstimationResidualStd(residualStd);

    // The x-value(day) of the first point in the array is always Monday
    const weeklyPatternPoints = normalizedYSeasonalPoints.slice(0, 7) as NormalizedYPoint<Date>[];
    const weeklyPatternPartialTrends = createPartialTrends(weeklyPatternPoints, 1e-8, false);

    const uIncreasingDynamic = mapConeAngle(
      trapmfL(CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 8));
    const uConstantDynamic = mapConeAngle(
      trapmf(-CHART_DIAGONAL_ANGLE / 8, -CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 8)
    );
    const uDecreasingDynamic = mapConeAngle(
      trapmfR(-CHART_DIAGONAL_ANGLE / 8, -CHART_DIAGONAL_ANGLE / 8));

    const uDynamics: [string, PointMembershipFunction<TimeSeriesPartialTrend>][] = [
      ['increased', uIncreasingDynamic],
      ['similar', uConstantDynamic],
      ['decreased', uDecreasingDynamic],
    ];

    const mergedWeeklyPatternPartialTrends = mergePartialTrends(
      weeklyPatternPartialTrends,
      [uIncreasingDynamic, uConstantDynamic, uDecreasingDynamic],
    );

    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const summaries: Summary[] = [{
      text: 'There is no weekly cyclic pattern in the data.',
      validity: 1.0 - weeklyPatternValidity,
    }];

    for (const partialTrend of mergedWeeklyPatternPartialTrends) {
      for (const [dynamic, uDynamic] of uDynamics) {
        const timeStartText = daysOfTheWeek[partialTrend.timeStart.getDay()];
        const timeEndText = daysOfTheWeek[partialTrend.timeEnd.getDay()];
        const rateAbsolute = Math.abs(
          denormalizeY(weeklyPatternPoints[partialTrend.indexEnd]).y - denormalizeY(weeklyPatternPoints[partialTrend.indexStart]).y
        ) / (partialTrend.indexEnd - partialTrend.indexStart);

        if (dynamic === 'similar') {
          const text = `The active users from <b>${timeStartText}</b> to <b>${timeEndText}</b> <b>remained similar</b> on average.`;
          summaries.push({
            text,
            validity: Math.min(uDynamic(partialTrend), weeklyPatternValidity),
          });
        } else {
          const text = `The active users from <b>${timeStartText}</b> to <b>${timeEndText}</b> <b>${dynamic} by ${formatY(rateAbsolute)} per day</b> on average.`;
          summaries.push({
            text,
            validity: Math.min(uDynamic(partialTrend), weeklyPatternValidity),
          });
        }
      }
    }

    return [{
      title: 'Trend Weekly Pattern',
      summaries,
    }];
  });
}
