import * as math from 'mathjs';
import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import {
  PointMembershipFunction,
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
} from './libs/protoform';
import {
  createExponentialMovingAveragePoints,
  createPartialTrends,
  TimeSeriesPartialTrend,
} from './libs/trend';
import { formatX, formatY } from '../../utils/formatters';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {

    const smoothedPoints = createExponentialMovingAveragePoints(points);
    const partialTrends = createPartialTrends(smoothedPoints, 0.01);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ cone }: TimeSeriesPartialTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad);
    };

    const MAX_ANGLE = Math.atan(500 / 800);

    const uIncreasingDynamic = applyTrendAngleWithWeight(trapmfL(MAX_ANGLE / 8, MAX_ANGLE / 4));
    const uConstantDynamic = applyTrendAngleWithWeight(trapmf(-MAX_ANGLE / 4, -MAX_ANGLE / 8, MAX_ANGLE / 8, MAX_ANGLE / 4));
    const uDecreasingDynamic = applyTrendAngleWithWeight(trapmfR(-MAX_ANGLE / 4, -MAX_ANGLE / 8));

    const uDynamics: [string, PointMembershipFunction<TimeSeriesPartialTrend>][] = [
      ['increased', uIncreasingDynamic],
      ['similar', uConstantDynamic],
      ['decreased', uDecreasingDynamic],
    ];

    const validityThreshold = 0.7;

    const mergePartialTrends = (a: TimeSeriesPartialTrend, b: TimeSeriesPartialTrend): TimeSeriesPartialTrend[] => {
      for (const [_, uDynamic] of uDynamics) {
        if (uDynamic(a) >= validityThreshold && uDynamic(b) >= validityThreshold) {
          const indexStart = Math.min(a.indexStart, b.indexStart);
          const indexEnd = Math.max(a.indexEnd, b.indexEnd);
          const timeStart = points[indexStart].x;
          const timeEnd = points[indexEnd].x;
          const percentageSpan = a.percentageSpan + b.percentageSpan;
          const startAngleRad = Math.min(a.cone.startAngleRad, b.cone.startAngleRad);
          const endAngleRad = Math.max(a.cone.endAngleRad, b.cone.endAngleRad);
          return [{
            indexStart,
            indexEnd,
            timeStart,
            timeEnd,
            percentageSpan,
            cone: {
              startAngleRad,
              endAngleRad,
            }
          }];
        }
      }
      return [a, b];
    };

    let mergedPartialTrends: TimeSeriesPartialTrend[] = [];
    for (const partialTrend of partialTrends) {
      if (mergedPartialTrends.length === 0) {
        mergedPartialTrends.push(partialTrend);
      } else {
        const prevTrend = mergedPartialTrends.pop() as TimeSeriesPartialTrend;
        mergedPartialTrends = mergedPartialTrends.concat(mergePartialTrends(prevTrend, partialTrend));
      }
    }

    const summaries: Summary[] = [];
    for (const partialTrend of mergedPartialTrends) {
      for (const [dynamic, uDynamic] of uDynamics) {
        const timeStart = formatX(partialTrend.timeStart);
        const timeEnd = formatX(partialTrend.timeEnd);
        if (dynamic === 'increased' || dynamic === 'decreased') {
          const yAbsoluteDiff = Math.abs(points[partialTrend.indexEnd].y - points[partialTrend.indexStart].y);
          const text = `The traffic from <b>${timeStart}</b> to <b>${timeEnd}</b>  <b>${dynamic} by ${formatY(yAbsoluteDiff)}</b>.`;
          const validity = uDynamic(partialTrend);
          summaries.push({ text, validity });
        } else {
          // y-values are similar
          const ySum = math.sum(math.range(partialTrend.indexStart, partialTrend.indexEnd + 1).map(i => points[i].y));
          const yAverage = ySum / (partialTrend.indexEnd - partialTrend.indexStart + 1);

          const text = `The traffic from <b>${timeStart}</b> to <b>${timeEnd}</b> is <b>${dynamic} around ${formatY(yAverage)}</b>.`;
          const validity = uDynamic(partialTrend);
          summaries.push({ text, validity });
        }
      }
    }
    return summaries;
  });
}
