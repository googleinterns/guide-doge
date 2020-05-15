import * as d3 from 'd3';
import {Margins} from './types';
import {Datum, Visualization} from './Visualization';

export abstract class XYAxis extends Visualization {
  protected scaleX: d3.ScaleTime<number, number>;
  protected scaleY: d3.ScaleLinear<number, number>;

  async render(
    height = 500,
    width = 800,
    margin: Margins = {top: 20, right: 30, bottom: 30, left: 40}
  ) {
    const svg = d3
      .create('svg')
      .attr('viewBox', [0, 0, width, height].join(' '));

    this.scaleX = d3
      .scaleUtc()
      .domain(d3.extent<Datum, Date>(this.data, d => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

    this.scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, d => d.value)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(this.scaleX)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(this.scaleY))
      // .call(g => g.select('.domain').remove())
      .call(g =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text('Active Users')
      );

    svg.selectAll('g.tick').attr('aria-hidden', true);

    return svg;
  }
}
