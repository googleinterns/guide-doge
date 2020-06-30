import { DataCube } from 'src/models/data-cube/data-cube.model';

export interface Dataset {
  charts: ChartMetaType[];
  dataCube: DataCube;
}

export type ChartMetaType = LineChartMeta | TabbedChartsMeta;

export type XYChartData = LineChartData;

export interface XYPoint<T, U> {
  x: T;
  y: U;
}

export interface ChartMeta<T extends string, QueryT> {
  type: T;
  query: QueryT;
  title: string;
  xlabel?: string;
  ylabel?: string;
}

export interface TabbedChartsMeta {
  type: 'tabbed';
  charts: ChartMetaType[];
  title: string;
}

export type LineChartMeta = ChartMeta<'line', LineChartQuery>;

export type LineChartQuery = (options: LineChartQueryOptions) => LineChartData[];

export interface LineChartQueryOptions {
  range: [Date, Date];
}

export interface LineChartData {
  points: XYPoint<Date, number>[];
  legend?: string;
  style?: LineChartStyle;
}

export interface LineChartStyle {
  color: string;
  width: number;
  opacity: number;
  dashes: number[];
}
