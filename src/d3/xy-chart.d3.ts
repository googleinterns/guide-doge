import * as d3 from 'd3';
import { BaseD3, HandleDestroy } from './base.d3';
import { Observable } from 'rxjs';
import { formatX } from '../utils/formatters';

export interface Datum {
  date: Date;
  value: number;
}

export interface RenderOptions {
  dataObservable: Observable<Datum[]>;
  activeDatumObservable: Observable<Datum | null>;
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export abstract class XYChartD3 extends BaseD3<RenderOptions> {
  protected render({
                     dataObservable,
                     activeDatumObservable,
                     height, width,
                     marginTop, marginRight, marginBottom, marginLeft,
                   }: RenderOptions) {
    const svg = this.container
      .append('svg')
      .style('width', width)
      .style('height', height)
      .attr('viewBox', [0, 0, width, height].join(' '));

    const scaleX = d3
      .scaleUtc()
      .range([marginLeft, width - marginRight]);

    const scaleY = d3
      .scaleLinear()
      .nice()
      .range([height - marginBottom, marginTop]);

    const xAxis = d3
      .axisBottom<Date>(scaleX)
      .ticks(d3.timeWeek.every(1))
      .tickFormat(formatX);

    const yAxis = d3.axisLeft<number>(scaleY);

    const xAxisG = svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`);

    const yAxisG = svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`);

    const dataSubscription = dataObservable.subscribe(data => {
      scaleX.domain(d3.extent<Datum, Date>(data, d => d.date) as [Date, Date]);
      scaleY.domain([0, d3.max(data, d => d.value)!]);

      xAxisG
        .transition(this.transition)
        .call(xAxis)
        .attr('font-size', 12);

      yAxisG
        .transition(this.transition)
        .call(yAxis)
        .attr('font-size', 12);
    });

    const handleDestroyData = this.renderData(svg, dataObservable, scaleX, scaleY);
    const handleDestroyActiveIndicator = this.renderActiveIndicator(
      svg, activeDatumObservable, scaleX, scaleY, xAxis, yAxis,
    );

    return () => {
      handleDestroyActiveIndicator();
      handleDestroyData();
      dataSubscription.unsubscribe();
      svg.remove();
    };
  }

  protected abstract renderData(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    dataObservable: Observable<Datum[]>,
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>,
  ): HandleDestroy;

  protected abstract renderActiveIndicator(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    activeDatumObservable: Observable<Datum | null>,
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>,
    xAxis: d3.Axis<Date>,
    yAxis: d3.Axis<number>,
  ): HandleDestroy;
}
