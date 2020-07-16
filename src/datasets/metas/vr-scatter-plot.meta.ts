import { VRTimeSeriesQuery } from '../queries/vr-time-series.query';
import { LineChartStyle } from '../../d3/line-chart.d3';
import { XYZChartMeta } from './types';

export type VRScatterplotMeta = XYZChartMeta<'vrScatter', VRTimeSeriesQuery<LineChartStyle>>;

export function createVRScatterplotMeta(
  title: string,
  query: VRTimeSeriesQuery<LineChartStyle>,
): VRScatterplotMeta {
  return {
    type: 'vrScatter',
    title,
    query,
  };
}




