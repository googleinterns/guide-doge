import { VRTimeSeriesQuery } from '../queries/vr-time-series.query';
import { ScatterPlotStyle as ScatterPlotLegendItemStyle } from '../../d3/scatterplot.d3';
import { XYZChartMeta } from './types';

export type VRScatterplotMeta = XYZChartMeta<'vrScatter', VRTimeSeriesQuery<ScatterPlotLegendItemStyle>>;

export function createVRScatterplotMeta(
  title: string,
  queryData: VRTimeSeriesQuery<ScatterPlotLegendItemStyle>,
): VRScatterplotMeta {
  return {
    type: 'vrScatter',
    title,
    queryData,
  };
}




