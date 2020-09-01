import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import {
  PointMembershipFunction,
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from './libs/protoform';
import { createPartialTrends, TimeSeriesPartialTrend } from './libs/trend';
import { chartDiagonalAngle } from './utils/constants';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const partialTrends = createPartialTrends(points, 0.01);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ percentageSpan, cone }: TimeSeriesPartialTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad) * percentageSpan * partialTrends.length;
    };

    const uQuicklyIncreasingTrend = applyTrendAngleWithWeight(trapmfL(chartDiagonalAngle / 2, chartDiagonalAngle * 3 / 5));
    const uIncreasingTrend = applyTrendAngleWithWeight(trapmfL(chartDiagonalAngle / 8, chartDiagonalAngle / 4));
    const uConstantTrend = applyTrendAngleWithWeight(
      trapmf(-chartDiagonalAngle / 4, -chartDiagonalAngle / 8, chartDiagonalAngle / 8, chartDiagonalAngle / 4));
    const uDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-chartDiagonalAngle / 4, -chartDiagonalAngle / 8));
    const uQuicklyDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-chartDiagonalAngle * 3 / 5, -chartDiagonalAngle / 2));

    const uMostPercentage = trapmfL(0.6, 0.7);
    const uHalfPercentage = trapmf(0.3, 0.4, 0.6, 0.7);
    const uFewPercentage = trapmf(0.1, 0.2, 0.3, 0.4);

    const uPercentages: [string, MembershipFunction][] = [
      ['most', uMostPercentage],
      ['half', uHalfPercentage],
      ['few', uFewPercentage],
    ];

    const uTrends: [string, PointMembershipFunction<TimeSeriesPartialTrend>][] = [
      ['quickly increasing', uQuicklyIncreasingTrend],
      ['increasing', uIncreasingTrend],
      ['constant', uConstantTrend],
      ['decreasing', uDecreasingTrend],
      ['quickly decreasing', uQuicklyDecreasingTrend],
    ];

    const summaries: Summary[] = [];
    for (const [quantifier, uPercentage] of uPercentages) {
      for (const [trend, uTrend] of uTrends) {
        const t = sigmaCountQA(partialTrends, uPercentage, uTrend);
        summaries.push({
          text: `trends that took <b>${quantifier}</b> of the time are <b>${trend}</b>.`,
          validity: t
        });
      }
    }

    return summaries;
  });
}
