import { TimeSeriesQuery } from '../queries/time-series.query';
import { LegendItemStyle as LineChartLegendItemStyle } from '../../d3/line-chart.d3';
import { MetaType, XYChartMeta } from './types';

export type LineChartMeta = XYChartMeta<MetaType.LINE_CHART, TimeSeriesQuery<LineChartLegendItemStyle>>;

async function importAudificationModule() {
  const { LineChartAudificationModule } = await import('../../components/line-chart-audification/line-chart-audification.module');
  return LineChartAudificationModule;
}

async function importSummarizationModule() {
  const { ChartSummarizationModule } = await import('../../components/chart-summarization/chart-summarization.module');
  return ChartSummarizationModule;
}

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
