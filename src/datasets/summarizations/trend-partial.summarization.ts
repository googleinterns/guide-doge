import * as math from 'mathjs';
import { Summary, SummaryVariableOptionPair } from './types';
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
  mapConeAngle,
  createExponentialMovingAveragePoints,
  createPartialTrends,
  TimeSeriesPartialTrend,
} from './libs/trend';
import { formatX, formatY } from '../../utils/formatters';
import { chartDiagonalAngle } from './utils/constants';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const smoothedPoints = createExponentialMovingAveragePoints(points);
    const partialTrends = createPartialTrends(smoothedPoints, 0.01);

    const uIncreasingDynamic = mapConeAngle(trapmfL(chartDiagonalAngle / 8, chartDiagonalAngle / 4));
    const uConstantDynamic = mapConeAngle(
      trapmf(-chartDiagonalAngle / 4, -chartDiagonalAngle / 8, chartDiagonalAngle / 8, chartDiagonalAngle / 4));
    const uDecreasingDynamic = mapConeAngle(trapmfR(-chartDiagonalAngle / 4, -chartDiagonalAngle / 8));

    const uDynamics: SummaryVariableOptionPair<PointMembershipFunction<TimeSeriesPartialTrend>>[] = [
      ['increased', uIncreasingDynamic],
      ['similar', uConstantDynamic],
      ['decreased', uDecreasingDynamic],
    ];

    const validityThreshold = 0.7;

    const mergePartialTrends = (a: TimeSeriesPartialTrend, b: TimeSeriesPartialTrend): TimeSeriesPartialTrend[] => {
      for (const uDynamic of [uIncreasingDynamic, uConstantDynamic, uDecreasingDynamic]) {
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
