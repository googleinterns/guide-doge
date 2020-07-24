import { Summary } from './types';
import { TimeSeriesPoint } from '../queries/time-series.query';
import { cacheSummaries } from './utils/commons';
import {
  PointMembershipFunction,
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from './libs/protoform';
import { normalizedUniformPartiallyLinearEpsApprox, TimeSeriesTrend, exponentialMovingAverage } from './utils/time-series';
import { formatX } from '../../utils/formatters';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const MX = Math.PI / 2;

    const smoothedPoints = exponentialMovingAverage(points);
    const trends = normalizedUniformPartiallyLinearEpsApprox(smoothedPoints, 0.01);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ cone }: TimeSeriesTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad);
    };

    const uIncreasingTrend = applyTrendAngleWithWeight(trapmfL(MX / 8, MX / 4));
    const uConstantTrend = applyTrendAngleWithWeight(trapmf(-MX / 4, -MX / 8, MX / 8, MX / 4));
    const uDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-MX / 4, -MX / 8));

    const uTrends: [string, PointMembershipFunction<TimeSeriesTrend>][] = [
      ['increasing', uIncreasingTrend],
      ['constant', uConstantTrend],
      ['decreasing', uDecreasingTrend],
    ];

    const mvThreshold = 0.7;

    const mergeTrends = (a: TimeSeriesTrend, b: TimeSeriesTrend): TimeSeriesTrend[] => {
      for (const [_, uTrend] of uTrends) {
        if (uTrend(a) >= mvThreshold && uTrend(b) >= mvThreshold) {
          const idxStart = Math.min(a.idxStart, b.idxStart);
          const idxEnd = Math.max(a.idxEnd, b.idxEnd);
          const timeStart = points[idxStart].x;
          const timeEnd = points[idxEnd].x;
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

    let mergedTrends: TimeSeriesTrend[] = [];
    for (const trend of trends) {
      if (mergedTrends.length === 0) {
        mergedTrends.push(trend);
      } else {
        const prevTrend = mergedTrends.pop() as TimeSeriesTrend;
        mergedTrends = mergedTrends.concat(mergeTrends(prevTrend, trend));
      }
    }

    const summaries: Summary[] = mergedTrends.map(trend => {
      for (const [text, uTrend] of uTrends) {
        if (uTrend(trend) >= mvThreshold) {
          const timeStart = formatX(trend.timeStart);
          const timeEnd = formatX(trend.timeEnd);
          if (text === 'increasing') {
            const diff = Math.abs(points[trend.idxEnd].y - points[trend.idxStart].y);
            return {
              text: `The traffic from <b>${timeStart}</b> to <b>${timeEnd}</b> <b>increased by ${diff.toFixed(2)}</b>.`,
              validity: 1.0,
            };
          } else if (text === 'decreasing') {
            const diff = Math.abs(points[trend.idxEnd].y - points[trend.idxStart].y);
            return {
              text: `The traffic from <b>${timeStart}</b> to <b>${timeEnd}</b> <b>decreased by ${diff.toFixed(2)}</b>.`,
              validity: 1.0,
            };
          } else {
            let avg = 0;
            for (let i = trend.idxStart; i <= trend.idxEnd; i++) {
              avg += points[i].y;
            }
            avg /= trend.idxEnd - trend.idxStart + 1;
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
