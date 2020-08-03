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
    const MX = Math.PI / 2;

    const trends = normalizedUniformPartiallyLinearEpsApprox(points, 0.01);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ pctSpan, cone }: TimeSeriesPartialTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad) * pctSpan * trends.length;
    };

    const uQuicklyIncreasingTrend = applyTrendAngleWithWeight(trapmfL(MX / 2, MX * 3 / 5));
    const uIncreasingTrend = applyTrendAngleWithWeight(trapmfL(MX / 8, MX / 4));
    const uConstantTrend = applyTrendAngleWithWeight(trapmf(-MX / 4, -MX / 8, MX / 8, MX / 4));
    const uDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-MX / 4, -MX / 8));
    const uQuicklyDecreasingTrend = applyTrendAngleWithWeight(trapmfR(-MX * 3 / 5, -MX / 2));

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
