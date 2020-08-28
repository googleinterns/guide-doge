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
import { normalizedUniformPartiallyLinearEpsApprox, TimeSeriesPartialTrend } from './libs/trend';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    // The size of the chart is fixed to 800 * 500
    const MAX_ANGLE = Math.atan(500 / 800);

    const trends = normalizedUniformPartiallyLinearEpsApprox(points, 0.01);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ pctSpan, cone }: TimeSeriesPartialTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad) * pctSpan * trends.length;
    };

    const uQuicklyIncreasingTrend = applyTrendAngleWithWeight(trapmfL(MAX_ANGLE / 2, MAX_ANGLE * 3 / 5));
    const uIncreasingTrend = applyTrendAngleWithWeight(trapmfL(MAX_ANGLE / 8, MAX_ANGLE / 4));
    const uConstantTrend = applyTrendAngleWithWeight(trapmf(-MAX_ANGLE / 4, -MAX_ANGLE / 8, MAX_ANGLE / 8, MAX_ANGLE / 4));
    const uDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-MAX_ANGLE / 4, -MAX_ANGLE / 8));
    const uQuicklyDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-MAX_ANGLE * 3 / 5, -MAX_ANGLE / 2));

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
        const t = sigmaCountQA(trends, uPercentage, uTrend);
        summaries.push({
          text: `trends that took <b>${quantifier}</b> of the time are <b>${trend}</b>.`,
          validity: t
        });
      }
    }

    return summaries;
  });
}
