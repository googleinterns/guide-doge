import { CategoricalQuery } from '../queries/categorical.query';
import { LegendItemStyle as BarChartLegendItemStyle } from '../../d3/bar-chart.d3';
import { MetaType, XYChartMeta } from './types';
import { audificationModuleImporter } from '../../components/line-chart-audification/line-chart-audification.importer';
import { summarizationModuleImporter } from '../../components/chart-summarization/chart-summarization.importer';

export type BarChartMeta = XYChartMeta<MetaType.BAR_CHART, CategoricalQuery<BarChartLegendItemStyle>>;

export function createBarChartMeta(
  title: string,
  queryData: CategoricalQuery<BarChartLegendItemStyle>,
): BarChartMeta {
  return {
    type: MetaType.BAR_CHART,
    title,
    queryData,
    a11yModuleImporters: [
      summarizationModuleImporter,
    ],
  };
}
