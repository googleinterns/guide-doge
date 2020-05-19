import * as d3 from 'd3';

export interface RenderOptions {
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export interface Datum<X = Date, Y = number> {
  date: X;
  value: Y;
}

export type SVGSelection = d3.Selection<
  SVGSVGElement,
  undefined,
  null,
  undefined
>;

export type ElementSelection = d3.Selection<any, undefined, null, undefined>;