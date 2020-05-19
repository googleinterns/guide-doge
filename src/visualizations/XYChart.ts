import * as d3 from 'd3';
import {Datum, RenderOptions, SVGSelection} from './types';
import {Visualization} from './Visualization';
import {DataCube} from '../datagen/DataCube';
import {DateTime} from 'luxon';
import {betweenDates} from '../datagen/filters';

export abstract class XYChart extends Visualization {
  protected data: Datum[];

  constructor(dataCube: DataCube, categoryName: string, measureName: string) {
    super(dataCube);

    const endDate = DateTime.local();
    const startDate = endDate.minus({day: 30});

    this.data = dataCube
      .getDataFor(
        [categoryName],
        [measureName],
        [betweenDates(startDate.toJSDate(), endDate.toJSDate())]
      )
      .map(datum => ({
        date: startDate
          .plus({days: datum.categories.get(categoryName) as number})
          .toJSDate(),
        value: datum.values.get(measureName)!,
      }));
  }

  render(renderOptions?: Partial<RenderOptions>) {
    const {height, width, marginTop, marginRight, marginBottom, marginLeft} = {
      ...Visualization.defaultRenderOptions,
      ...renderOptions,
    };

    const svg = d3
      .create('svg')
      .attr('viewBox', [0, 0, width, height].join(' '));

    const scaleX = d3
      .scaleUtc()
      .domain(d3.extent<Datum, Date>(this.data, d => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    const scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, d => d.value)!])
      .nice()
      .range([height - marginBottom, marginTop]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(scaleX)
          .ticks(width / 80)
          .tickSizeOuter(0)
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
          .text('Active Users')
      );

    svg.selectAll('g.tick').attr('aria-hidden', true);

    this.appendChart(svg, scaleX, scaleY);

    return svg;
  }

  abstract appendChart(
    svg: SVGSelection,
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>
  ): void;
}
