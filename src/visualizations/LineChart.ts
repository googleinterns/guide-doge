import * as d3 from 'd3';
import {Datum, SVGSelection} from './types';
import {XYAxis} from './XYAxis';

export class LineChart extends XYAxis {
  appendChart(
    svg: SVGSelection,
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>
  ) {
    const line = d3
      .line<Datum>()
      .defined(d => !isNaN(d.value))
      .x(d => scaleX(d.date))
      .y(d => scaleY(d.value));

    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);
  }
}
