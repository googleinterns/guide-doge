import * as math from 'mathjs';
import { Summary } from './types';
import { CategoricalPoint } from '../metas/types';
import { cacheSummaries, createOrdinalText } from './utils/commons';
import { formatY } from '../../utils/formatters';

export interface Config {
  topk: number;
  showPercentage: boolean;
  metric: string;
}

const defaultConfig: Config = {
  topk: 3,
  showPercentage: false,
  metric: 'sessions',
};

export function queryFactory(points: CategoricalPoint[], config?: Partial<Config>) {
  return cacheSummaries(() => {
    const { topk, metric, showPercentage } = { ...defaultConfig, ...(config ?? {}) };

    const sortedPoints = [...points].sort(({ y: y1 }, { y: y2 }) => y2 - y1);
    const totalYSum = math.sum(points.map(({ y }) => y));
    const getPercentageText = (yValue: number) => showPercentage ? ` (${formatY(yValue / totalYSum * 100)}%)` : '';

    const summaries = sortedPoints.filter((_, i) => i < topk).map((point, i) => ({
      text: `<b>${point.x}</b> has the <b>${createOrdinalText(i + 1)}</b> highest value with <b>${point.y}${getPercentageText(point.y)} ${metric}</b>.`,
      validity: 1.0,
    }));

    return [{
      title: `Category Top-${topk}`,
      summaries
    }];
  });
}
