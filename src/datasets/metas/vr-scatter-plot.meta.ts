import { VRTimeSeriesQuery } from '../queries/vr-time-series.query';
import { ScatterPlotStyle as ScatterPlotLegendItemStyle } from '../../d3/scatterplot.d3';
import { XYZChartMeta, MetaType } from './types';

export type VRScatterplotMeta = XYZChartMeta<MetaType.SCATTER_PLOT, VRTimeSeriesQuery<ScatterPlotLegendItemStyle>>;

export function createVRScatterplotMeta(
  title: string,
  queryData: VRTimeSeriesQuery<ScatterPlotLegendItemStyle>,
): VRScatterplotMeta {
  return {
    type: MetaType.SCATTER_PLOT,
    title,
    queryData,
  };
}




