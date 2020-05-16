import * as d3 from 'd3';

export interface RenderOptions {
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export interface Datum {
  date: Date;
  value: number;
}

export type SVGSelection = d3.Selection<
  SVGSVGElement,
  undefined,
  null,
  undefined
>;
