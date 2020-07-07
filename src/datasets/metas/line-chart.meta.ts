import { TimeSeriesQuery } from '../queries/time-series.query';
import { LineChartStyle } from '../../d3/line-chart.d3';
import { XYChartMeta } from './types';

export type LineChartMeta = XYChartMeta<'line', TimeSeriesQuery<LineChartStyle>>;

export function createLineChartMeta(
  title: string,
  query: TimeSeriesQuery<LineChartStyle>,
): LineChartMeta {
  return {
    type: 'line',
    title,
    query,
  };
}
