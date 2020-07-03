import { DataCube } from 'src/models/data-cube/data-cube.model';
import { TimeSeriesQuery } from './queries/time-series.query';
import { LineChartStyle } from '../d3/line-chart.d3';

export interface Dataset {
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

export interface TabbedChartsMeta extends ComponentMeta<'tabbed'> {
  metas: ChartMeta[];
}

export type ChartMeta = LineChartMeta;

export interface XYChartMeta<T extends string, QueryT> extends DataComponentMeta<T, QueryT> {
  xLabel?: string;
  yLabel?: string;
}

export interface XYPoint<T, U> {
  x: T;
  y: U;
}

export type LineChartMeta = XYChartMeta<'line', TimeSeriesQuery<LineChartStyle>>;
