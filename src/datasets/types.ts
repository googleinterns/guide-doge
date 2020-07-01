import { DataCube } from 'src/models/data-cube/data-cube.model';

export interface Dataset  {
  metas: Array<Meta>;
  dataCube: DataCube;
}

export type Meta = TabbedChartsMeta | ChartMeta;

export interface ComponentMeta<T extends string> {
  type: T;
  title: string;
}

export interface DataComponentMeta<T extends string, QueryT> extends ComponentMeta<T> {
  query: QueryT;
}

export interface ContainerComponentMeta<T extends string, MetaT> extends ComponentMeta<T> {
  metas: MetaT;
}

export type TabbedChartsMeta = ContainerComponentMeta<'tabbed', ChartMeta[]>;

export type ChartMeta = LineChartMeta;

export interface XYChartMeta<T extends string, QueryT> extends DataComponentMeta<T, QueryT> {
  xlabel?: string;
  ylabel?: string;
}

export interface XYPoint<T, U> {
  x: T;
  y: U;
}

export type XYChartData = LineChartData;

export type LineChartMeta = XYChartMeta<'line', LineChartQuery>;

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
