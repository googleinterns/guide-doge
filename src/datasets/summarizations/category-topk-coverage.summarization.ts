import * as math from 'mathjs';
import { Summary } from './types';
import { CategoricalPoint } from '../metas/types';
import { cacheSummaries, createOrdinalText } from './utils/commons';
import { formatY } from '../../utils/formatters';

export interface Config {
  topk: number;
  xlabel: string;
  metric: string;
}

const defaultConfig: Config = {
  topk: 3,
  xlabel: 'countries',
  metric: 'sessions',
};

export function queryFactory(points: CategoricalPoint[], config?: Partial<Config>) {
  return cacheSummaries(() => {
    const { topk, metric, xlabel } = { ...defaultConfig, ...(config ?? {}) };

    const isTopkFilter = (_: any, i: number) => i < topk;
    const sortedPoints = [...points].sort(({ y: y1 }, { y: y2 }) => y2 - y1);
    const actualTopk = Math.min(topk, points.length);

    const xValues = sortedPoints.map(({ x }) => x);
    const yValues = sortedPoints.map(({ y }) => y);
    const totalYSum = math.sum(yValues);
    const topkYSum = math.sum(yValues.filter(isTopkFilter));

    const topkXValuesText = xValues.filter(isTopkFilter).join(', ');
    const topkCoverageText = formatY(topkYSum / totalYSum * 100);
    const text = `The <b>top ${actualTopk}</b> ${xlabel} with the highest value <b>(${topkXValuesText})</b> contain <b>${topkCoverageText}%</b> of total ${metric}.`;

    return [{
      title: `Category Top-${topk} Coverage`,
      summaries: [{
        text,
        validity: 1.0,
      }]
    }];
  });
}
