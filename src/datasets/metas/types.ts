import { LineChartMeta } from './line-chart.meta';
import { TabbedChartsMeta } from './tabbed-charts.meta';
import { VRScatterplotMeta } from './vr-scatter-plot.meta';

export interface BaseMeta<T extends string> {
  type: T;
  title: string;
}

export interface DataMeta<T extends string, QueryT> extends BaseMeta<T> {
  query: QueryT;
}

export interface XYChartMeta<T extends string, QueryT> extends DataMeta<T, QueryT> {
  xLabel?: string;
  yLabel?: string;
}

export interface XYPoint<T, U> {
  x: T;
  y: U;
}

export interface XYZChartMeta<T extends string, QueryT> extends DataMeta<T, QueryT> {
  xLabel?: string;
  yLabel?: string;
  zLabel?: string;
}

export interface XYZPoint<T, U, V> {
  x: T;
  y: U;
  z: V;
}

export type Meta = LineChartMeta | TabbedChartsMeta | VRScatterplotMeta;
