import * as d3 from 'd3';
import {Datum, Visualization} from './Visualization';

export class LineChart extends Visualization {
  async render(
    height = 500,
    width = 800,
    margin = {top: 20, right: 30, bottom: 30, left: 40}
  ) {
    const svg = d3
      .create('svg')
      .attr('viewBox', [0, 0, width, height].join(' '));

    const x = d3
      .scaleUtc()
      .domain(d3.extent<Datum, Date>(this.data, d => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, d => d.value)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<Datum>()
      .defined(d => !isNaN(d.value))
      .x(d => x(d.date))
      .y(d => y(d.value));

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())
      .call(g =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text('Active Users')
      );

    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);

    return svg.node()!;
  }
}
