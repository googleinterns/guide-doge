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
  exponentialMovingAverage,
  normalizedUniformPartiallyLinearEpsApprox,
  TimeSeriesPartialTrend,
} from './libs/trend';
import { formatX } from '../../utils/formatters';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {

    const smoothedPoints = exponentialMovingAverage(points);
    const partialTrends = normalizedUniformPartiallyLinearEpsApprox(smoothedPoints, 0.01);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ cone }: TimeSeriesPartialTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad);
    };

    const MAX_ANGLE = Math.atan(500 / 800);

    const uIncreasingTrend = applyTrendAngleWithWeight(trapmfL(MAX_ANGLE / 8, MAX_ANGLE / 4));
    const uConstantTrend = applyTrendAngleWithWeight(trapmf(-MAX_ANGLE / 4, -MAX_ANGLE / 8, MAX_ANGLE / 8, MAX_ANGLE / 4));
    const uDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-MAX_ANGLE / 4, -MAX_ANGLE / 8));

    const uTrends: [string, PointMembershipFunction<TimeSeriesPartialTrend>][] = [
      ['increasing', uIncreasingTrend],
      ['constant', uConstantTrend],
      ['decreasing', uDecreasingTrend],
    ];

    const validityThreshold = 0.7;

    const mergePartialTrends = (a: TimeSeriesPartialTrend, b: TimeSeriesPartialTrend): TimeSeriesPartialTrend[] => {
      for (const [_, uTrend] of uTrends) {
        if (uTrend(a) >= validityThreshold && uTrend(b) >= validityThreshold) {
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

    const summaries: Summary[] = mergedPartialTrends.map(trend => {
      for (const [text, uTrend] of uTrends) {
        if (uTrend(trend) >= validityThreshold) {
          const timeStart = formatX(trend.timeStart);
          const timeEnd = formatX(trend.timeEnd);
          if (text === 'increasing') {
            const diff = Math.abs(points[trend.indexEnd].y - points[trend.indexStart].y);
            return {
              text: `The traffic from <b>${timeStart}</b> to <b>${timeEnd}</b> <b>increased by ${diff.toFixed(2)}</b>.`,
              validity: 1.0,
            };
          } else if (text === 'decreasing') {
            const diff = Math.abs(points[trend.indexEnd].y - points[trend.indexStart].y);
            return {
              text: `The traffic from <b>${timeStart}</b> to <b>${timeEnd}</b> <b>decreased by ${diff.toFixed(2)}</b>.`,
              validity: 1.0,
            };
          } else {
            let avg = 0;
            for (let i = trend.indexStart; i <= trend.indexEnd; i++) {
              avg += points[i].y;
            }
            avg /= trend.indexEnd - trend.indexStart + 1;
            return {
              text: `The traffic from <b>${timeStart}</b> to <b>${timeEnd}</b> is <b>constant around ${avg.toFixed(2)}</b>.`,
              validity: 1.0,
            };
          }
        }
      }
    }).filter(summary => summary) as Summary[];
    return summaries;
  });
}
