import { TimeSeriesQuery } from '../queries/time-series.query';
import { LegendItemStyle as LineChartLegendItemStyle } from '../../d3/line-chart.d3';
import { MetaType, XYChartMeta } from './types';
import { importAudificationModule } from '../../components/line-chart-audification/line-chart-audification.importer';
import { importSummarizationModule } from '../../components/chart-summarization/chart-summarization.importer';

export type LineChartMeta = XYChartMeta<MetaType.LINE_CHART, TimeSeriesQuery<LineChartLegendItemStyle>>;

export function createLineChartMeta(
  title: string,
  queryData: TimeSeriesQuery<LineChartLegendItemStyle>,
): LineChartMeta {
  return {
    type: MetaType.LINE_CHART,
    title,
    queryData,
    a11yModuleImporters: [
      importAudificationModule,
      importSummarizationModule,
    ],
  };
}
