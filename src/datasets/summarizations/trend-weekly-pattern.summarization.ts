
import * as math from 'mathjs';
import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries, normalizePointsX } from './utils/commons';
import {
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
  MembershipFunction,
  PointMembershipFunction,
} from './libs/protoform';
import {
  TimeSeriesPartialTrend,
  linearRegression,
  centeredMovingAverage,
  normalizedUniformPartiallyLinearEpsApprox,
  additiveDecomposition,
} from './libs/trend';
import {
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
} from './utils/time-series';
import {
  NormalizedYPoint,
  normalizePointsY,
} from './utils/commons';
import { sum } from '../../utils/misc';
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
    const zeroPoints = normalizedPoints.map(({ x, y }) => ({ x, y: 0 }));
    const {
      seasonPoints: normalizedYSeasonPoints,
      residualPoints: normalizedYResidualPoints,
    } = additiveDecomposition(normalizedPoints, zeroPoints, ({ x }) => x.getDay());

    const uSmallEstimationResidualStd = trapmfR(0.075, 0.1);
    const residualStd = math.std(normalizedYResidualPoints.map(({ y }) => y));
    const weeklyPatternValidity = uSmallEstimationResidualStd(residualStd);

    // The x-value(day) of the first point in the array is always Monday
    const weeklyPatternPoints = normalizedYSeasonPoints.slice(0, 7) as NormalizedYPoint<Date>[];
    const weeklyPatternTrends = normalizedUniformPartiallyLinearEpsApprox(weeklyPatternPoints, 0.02, false);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ cone }: TimeSeriesPartialTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad);
    };

    const ANGMX = Math.PI / 2;
    const uIncreasingTrend = applyTrendAngleWithWeight(trapmfL(ANGMX / 15, ANGMX / 15));
    const uConstantTrend = applyTrendAngleWithWeight(trapmf(-ANGMX / 15, -ANGMX / 15, ANGMX / 15, ANGMX / 15));
    const uDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-ANGMX / 15, -ANGMX / 15));

    const uTrends: [string, PointMembershipFunction<TimeSeriesPartialTrend>][] = [
      ['increasing', uIncreasingTrend],
      ['constant', uConstantTrend],
      ['decreasing', uDecreasingTrend],
    ];

    const mvThreshold = 0.7;

    const mergeTrends = (a: TimeSeriesPartialTrend, b: TimeSeriesPartialTrend): TimeSeriesPartialTrend[] => {
      for (const [_, uTrend] of uTrends) {
        if (uTrend(a) >= mvThreshold && uTrend(b) >= mvThreshold) {
          const idxStart = Math.min(a.idxStart, b.idxStart);
          const idxEnd = Math.max(a.idxEnd, b.idxEnd);
          const timeStart = weeklyPatternPoints[idxStart].x;
          const timeEnd = weeklyPatternPoints[idxEnd].x;
          const pctSpan = a.pctSpan + b.pctSpan;
          const startAngleRad = Math.min(a.cone.startAngleRad, b.cone.startAngleRad);
          const endAngleRad = Math.max(a.cone.endAngleRad, b.cone.endAngleRad);
          return [{
            idxStart,
            idxEnd,
            timeStart,
            timeEnd,
            pctSpan,
            cone: {
              startAngleRad,
              endAngleRad,
            }
          }];
        }
      }
      return [a, b];
    };

    const mergedWeeklyPatternTrends: TimeSeriesPartialTrend[] = [];
    for (const trend of weeklyPatternTrends) {
      if (mergedWeeklyPatternTrends.length === 0) {
        mergedWeeklyPatternTrends.push(trend);
      } else {
        const prevTrend = mergedWeeklyPatternTrends.pop() as TimeSeriesPartialTrend;
        mergedWeeklyPatternTrends.push(...mergeTrends(prevTrend, trend));
      }
    }

    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const summaries: Summary[] = [];
    if (weeklyPatternValidity > 0.7) {
      for (const trend of mergedWeeklyPatternTrends) {
        for (const [trendDynamicDescriptor, uTrend] of uTrends) {
          if (uTrend(trend) >= mvThreshold) {
            const timeStartText = daysOfTheWeek[trend.timeStart.getDay()];
            const timeEndText = daysOfTheWeek[trend.timeEnd.getDay()];
            const rateAbsolute = Math.abs(
              denormalizeY(weeklyPatternPoints[trend.idxEnd]).y - denormalizeY(weeklyPatternPoints[trend.idxStart]).y
            ) / (trend.idxEnd - trend.idxStart);

            if (trendDynamicDescriptor === 'increasing') {
              const text = `The active users from <b>${timeStartText}</b> to <b>${timeEndText}</b> was <b> increasing by ${formatY(rateAbsolute)} per day</b>.`;
              summaries.push({
                text,
                validity: 1.0,
              });
            } else if (trendDynamicDescriptor === 'decreasing') {
              const text = `The active users from <b>${timeStartText}</b> to <b>${timeEndText}</b> was <b> decreasing by ${formatY(rateAbsolute)} per day</b>.`;
              summaries.push({
                text,
                validity: 1.0,
              });
            } else {
              const text = `The active users from <b>${timeStartText}</b> to <b>${timeEndText}</b> <b>remained similar</b>.`;
              summaries.push({
                text,
                validity: 1.0,
              });
            }
          }
        }
      }
    } else {
      summaries.push({
        text: 'There is no weekly cyclic pattern in the data.',
        validity: 1.0,
      });
    }

    return summaries;
  });
}
