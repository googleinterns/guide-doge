import { BaseMeta, MetaType } from './types';
import { LineChartMeta } from './line-chart.meta';

export type ChartMeta = LineChartMeta;

export interface TabbedChartsMeta extends BaseMeta<MetaType.TABBED_CHARTS> {
  metas: ChartMeta[];
}

export function createTabbedChartsMeta(
  title: string,
  metas: ChartMeta[],
): TabbedChartsMeta {
  return {
    type: MetaType.TABBED_CHARTS,
    title,
    metas,
  };
}

