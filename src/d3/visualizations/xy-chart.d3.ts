import * as d3 from 'd3';
import { BaseD3 } from '../base.d3';

export interface Datum {
  date: Date;
  value: number;
}

export interface RenderOptions {
  data: Datum[];
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export abstract class XYChartD3 extends BaseD3<RenderOptions> {
  protected render({
                     data,
                     height, width,
                     marginTop, marginRight, marginBottom, marginLeft,
                   }: RenderOptions) {
    const svg = this.container
      .append('svg')
      .attr('viewBox', [0, 0, width, height].join(' '));

    const scaleX = d3
      .scaleUtc()
      .domain(d3.extent<Datum, Date>(data, d => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    const scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .nice()
      .range([height - marginBottom, marginTop]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(scaleX)
          .ticks(width / 80)
          .tickSizeOuter(0),
      );

    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(scaleY))
      // .call(g => g.select('.domain').remove())
      .call(g =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text('Active Users'),
      );

    this.appendChart(svg, data, scaleX, scaleY);

    return () => {
      svg.remove();
    };
  }

  protected abstract appendChart(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: Datum[],
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>,
  ): void;
}
