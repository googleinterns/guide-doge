import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import { Observable } from 'rxjs';
import { formatX } from '../utils/formatters';
import { XYChartD3 } from './xy-chart.d3';
import { TimeSeriesPoint } from '../datasets/metas/types';
import { TimeSeriesDatum } from '../datasets/queries/time-series.query';

export interface RenderOptions<Datum> extends BaseRenderOptions {
  data$: Observable<Datum[]>;
  activePoint$: Observable<TimeSeriesPoint | null>;
}

export abstract class TimeSeriesChartD3<LegendItemStyle,
  Datum extends TimeSeriesDatum<LegendItemStyle> = TimeSeriesDatum<LegendItemStyle>
  > extends XYChartD3<TimeSeriesPoint, Datum, d3.ScaleTime<number, number>> {

  x(value: Date) {
    return this.scaleX(value);
  }

  y(value: number) {
    return this.scaleY(value);
  }

  protected renderAxis() {
    const { height, width } = this.renderOptions;
    const { xAxisHeight, yAxisWidth, legendHeight, padding, fontSizeSmall } = XYChartD3;

    const top = padding;
    const bottom = height - xAxisHeight - legendHeight - padding;
    const left = padding + yAxisWidth;
    const right = width - padding;

    this.scaleX = d3
      .scaleUtc()
      .range([left, right]);
    this.scaleY = d3
      .scaleLinear()
      .nice()
      .range([bottom, top]);

    this.xAxis = d3
      .axisBottom<Date>(this.scaleX)
      .ticks(d3.timeWeek.every(1))
      .tickFormat(formatX);
    this.yAxis = d3.axisLeft<number>(this.scaleY);

    this.xAxisG = this.svg
      .append('g')
      .attr('class', 'xy_chart-x_axis')
      .attr('transform', `translate(0,${bottom})`)
      .attr('font-size', fontSizeSmall);
    this.yAxisG = this.svg
      .append('g')
      .attr('class', 'xy_chart-y_axis')
      .attr('transform', `translate(${left},0)`)
      .attr('font-size', fontSizeSmall);
  }

  protected updateAxis(data: Datum[]) {
    const points = data.flatMap(datum => datum.points);
    const xs = points.map(point => point.x);
    const ys = points.map(point => point.y);
    this.scaleX.domain([d3.min(xs)!, d3.max(xs)!]);
    this.scaleY.domain([0, d3.max(ys)!]);

    this.xAxisG
      .transition(this.transition)
      .call(this.xAxis);
    this.yAxisG
      .transition(this.transition)
      .call(this.yAxis);
  }

  protected abstract updateData(data: Datum[]);

  protected abstract renderActivePoint();

  protected abstract updateActivePoint(activePoint: TimeSeriesPoint | null);

  protected abstract appendLegendItemIcon(itemG: d3.Selection<SVGGElement, unknown, null, undefined>, datum: Datum);
}
