import { BaseMeta } from './types';
import { LineChartMeta } from './line-chart.meta';

export type ChartMeta = LineChartMeta;

export interface TabbedChartsMeta extends BaseMeta<'tabbed'> {
  metas: ChartMeta[];
}

export function createTabbedChartsMeta(
  title: string,
  metas: ChartMeta[],
): TabbedChartsMeta {
  return {
    type: 'tabbed',
    title,
    metas,
  };
}

