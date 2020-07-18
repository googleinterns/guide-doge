import { VRTimeSeriesQuery } from '../queries/vr-time-series.query';
import { LegendItemStyle as LineChartLegendItemStyle } from '../../d3/line-chart.d3';
import { XYZChartMeta } from './types';

export type VRScatterplotMeta = XYZChartMeta<'vrScatter', VRTimeSeriesQuery<LineChartLegendItemStyle>>;

export function createVRScatterplotMeta(
  title: string,
  queryData: VRTimeSeriesQuery<LineChartLegendItemStyle>,
): VRScatterplotMeta {
  return {
    type: 'vrScatter',
    title,
    queryData,
  };
}




