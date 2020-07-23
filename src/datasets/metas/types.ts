import { LineChartMeta } from './line-chart.meta';
import { TabbedChartsMeta } from './tabbed-charts.meta';
import { VRScatterplotMeta } from './vr-scatter-plot.meta';
import { Scene } from 'three';
import { GeoMapMeta } from './geo-map.meta';


export interface BaseMeta<T extends MetaType> {
  type: T;
  title: string;
}

export interface DataMeta<T extends MetaType, QueryT> extends BaseMeta<T> {
  queryData: QueryT;
}

export interface XYChartMeta<T extends MetaType, QueryT> extends DataMeta<T, QueryT> {
  xLabel?: string;
  yLabel?: string;
}

export interface XYPoint<T, U> {
  x: T;
  y: U;
}

export interface XYZChartMeta<T extends MetaType, QueryT> extends DataMeta<T, QueryT> {
  xLabel?: string;
  yLabel?: string;
  zLabel?: string;
}

export interface XYZPoint<S, T, U, V> {
  categories: S;
  x: T;
  y: U;
  z: V;
}

export type Meta = LineChartMeta | TabbedChartsMeta | GeoMapMeta | VRScatterplotMeta;

export enum MetaType {
  TABBED_CHARTS,
  LINE_CHART,
  GEO_MAP,
  SCATTER_PLOT
}
