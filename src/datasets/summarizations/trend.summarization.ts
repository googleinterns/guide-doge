import { Summary, SummaryVariableOptionPair } from './types';
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
import { CHART_DIAGONAL_ANGLE } from './utils/constants';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    const partialTrends = createPartialTrends(points, 0.01);

    const applyTrendAngleWithWeight = (f: MembershipFunction) => ({ percentageSpan, cone }: TimeSeriesPartialTrend) => {
      const avgAngleRad = (cone.endAngleRad + cone.startAngleRad) / 2;
      return f(avgAngleRad) * percentageSpan * partialTrends.length;
    };

    const uQuicklyIncreasingDynamic = applyTrendAngleWithWeight(trapmfL(CHART_DIAGONAL_ANGLE / 2, CHART_DIAGONAL_ANGLE * 3 / 5));
    const uIncreasingDynamic = applyTrendAngleWithWeight(trapmfL(CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 4));
    const uConstantDynamic = applyTrendAngleWithWeight(
      trapmf(-CHART_DIAGONAL_ANGLE / 4, -CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 4));
    const uDecreasingDynamic = applyTrendAngleWithWeight(trapmfR(-CHART_DIAGONAL_ANGLE / 4, -CHART_DIAGONAL_ANGLE / 8));
    const uQuicklyDecreasingDynamic = applyTrendAngleWithWeight(trapmfR(-CHART_DIAGONAL_ANGLE * 3 / 5, -CHART_DIAGONAL_ANGLE / 2));

    const uMostPercentage = trapmfL(0.6, 0.7);
    const uHalfPercentage = trapmf(0.3, 0.4, 0.6, 0.7);
    const uFewPercentage = trapmf(0.1, 0.2, 0.3, 0.4);

    const uPercentages: SummaryVariableOptionPair<MembershipFunction>[] = [
      ['most', uMostPercentage],
      ['half', uHalfPercentage],
      ['few', uFewPercentage],
    ];

    const uDynamics: SummaryVariableOptionPair<PointMembershipFunction<TimeSeriesPartialTrend>>[] = [
      ['quickly increasing', uQuicklyIncreasingDynamic],
      ['increasing', uIncreasingDynamic],
      ['constant', uConstantDynamic],
      ['decreasing', uDecreasingDynamic],
      ['quickly decreasing', uQuicklyDecreasingDynamic],
    ];

    const summaries: Summary[] = [];
    for (const [quantifier, uPercentage] of uPercentages) {
      for (const [dynamic, uDynamic] of uDynamics) {
        const t = sigmaCountQA(partialTrends, uPercentage, uDynamic);
        summaries.push({
          text: `trends that took <b>${quantifier}</b> of the time are <b>${dynamic}</b>.`,
          validity: t
        });
      }
    }

    return summaries;
  });
}
