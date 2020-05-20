import { XYChart, XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import Datum = XYChart.Datum;

export class LineChartD3 extends XYChartD3 {
  protected appendChart(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: Datum[],
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>,
  ): void {
    const line = d3
      .line<Datum>()
      .defined(d => !isNaN(d.value))
      .x(d => scaleX(d.date))
      .y(d => scaleY(d.value));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);
  }
}
