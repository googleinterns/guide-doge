import { LineChartMeta } from './line-chart.meta';
import { TabbedChartsMeta } from './tabbed-charts.meta';
import { VRScatterplotMeta } from './vr-scatter-plot.meta';
import { GeoMapMeta } from './geo-map.meta';
import { SummarizationMeta } from '../../services/summarization/types';
import { A11yModuleImporter } from '../../directives/a11y/a11y.directive';

export interface BaseMeta<T extends MetaType> {
  type: T;
  title: string;
  a11yModuleImporters?: A11yModuleImporter[];
}

export interface DataMeta<T extends MetaType, QueryT> extends BaseMeta<T> {
  queryData: QueryT;
}

export interface XYChartMeta<T extends MetaType, QueryT> extends DataMeta<T, QueryT> {
  xLabel?: string;
  yLabel?: string;
  summarizationMetas?: SummarizationMeta[];
}

export interface XYPoint<T, U> {
  x: T;
  y: U;
}

export interface ScatterPlotMeta<T extends MetaType, QueryT> extends DataMeta<T, QueryT> {
  xLabel?: string;
  yLabel?: string;
  zLabel?: string;
}
export type TimeSeriesPoint = XYPoint<Date, number>;

export type NumPoint = XYPoint<number, number>;

export interface ScatterPoint<S> {
  categories: S;
  x: number;
  y: number;
  z: number;
}

export type Meta = LineChartMeta | TabbedChartsMeta | GeoMapMeta | VRScatterplotMeta;

export enum MetaType {
  TABBED_CHARTS,
  LINE_CHART,
  GEO_MAP,
  SCATTER_PLOT,
}
