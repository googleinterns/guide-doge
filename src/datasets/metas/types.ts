import { LineChartMeta } from './line-chart.meta';
import { TabbedChartsMeta } from './tabbed-charts.meta';
import { GeoMapMeta } from './geo-map.meta';

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

export type Meta = LineChartMeta | TabbedChartsMeta | GeoMapMeta;
