import { TimeSeriesQuery } from '../queries/time-series.query';
import { LegendItemStyle as LineChartLegendItemStyle } from '../../d3/line-chart.d3';
import { XYChartMeta } from './types';

export type LineChartMeta = XYChartMeta<'line', TimeSeriesQuery<LineChartLegendItemStyle>>;

export function createLineChartMeta(
  title: string,
  queryData: TimeSeriesQuery<LineChartLegendItemStyle>,
): LineChartMeta {
  return {
    type: 'line',
    title,
    queryData,
  };
}
