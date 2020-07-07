import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import { Observable } from 'rxjs';
import { formatX } from '../utils/formatters';
import { TimeSeriesDatum, TimeSeriesPoint } from '../datasets/queries/time-series.query';

export interface RenderOptions<Datum> extends BaseRenderOptions {
  data$: Observable<Datum[]>;
  activePoint$: Observable<TimeSeriesPoint | null>;
}

export abstract class XYChartD3<LegendItemStyle,
  Datum extends TimeSeriesDatum<LegendItemStyle> = TimeSeriesDatum<LegendItemStyle>> extends BaseD3<RenderOptions<Datum>> {
  static padding = 16;
  static yAxisWidth = 40;
  static xAxisHeight = 20;
  static legendIconWidth = 16;
  static legendIconHeight = XYChartD3.legendIconWidth;
  static legendPaddingTop = 8;
  static legendHeight = XYChartD3.legendIconHeight + XYChartD3.legendPaddingTop;
  static fontSizeSmall = 12;
  static fontSizeMedium = 14;

  protected scaleX: d3.ScaleTime<number, number>;
  protected scaleY: d3.ScaleLinear<number, number>;
  protected xAxis: d3.Axis<Date>;
  protected yAxis: d3.Axis<number>;
  protected xAxisG: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected yAxisG: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected legendG: d3.Selection<SVGGElement, unknown, null, undefined>;

  x(value: Date) {
    return this.scaleX(value);
  }

  y(value: number) {
    return this.scaleY(value);
  }

  render() {
    super.render();

    const { data$, activePoint$ } = this.renderOptions;

    this.renderLegend();
    this.renderAxis();
    this.renderData();
    this.renderActivePoint();

    data$
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        this.updateLegend(data);
        this.updateAxis(data);
        this.updateData(data);
      });

    activePoint$
      .pipe(this.takeUntilCleared())
      .subscribe(activePoint => {
        this.updateActivePoint(activePoint);
      });
  }

  protected renderLegend() {
    const { height } = this.renderOptions;
    const { legendHeight, legendPaddingTop, padding } = XYChartD3;

    const top = height - padding - legendHeight + legendPaddingTop;
    const left = padding;

    this.legendG = this.svg
      .append('g')
      .attr('transform', `translate(${left},${top})`);
  }

  protected updateLegend(data: Datum[]) {
    const { legendIconWidth, fontSizeMedium } = XYChartD3;

    this.legendG.html('');

    let offsetX = 0;
    for (const datum of data) {
      const itemG = this.legendG
        .append('g')
        .attr('transform', `translate(${offsetX}, 0)`);
      this.appendLegendItemIcon(itemG, datum);
      const textOffsetX = legendIconWidth + fontSizeMedium * .5;
      const measureText = itemG
        .append('text')
        .attr('font-size', fontSizeMedium)
        .attr('transform', `translate(${textOffsetX}, ${fontSizeMedium})`)
        .text(datum.label);
      const textWidth = measureText.node()!.getBBox().width;
      offsetX += textOffsetX + textWidth + fontSizeMedium;
    }
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
      .attr('transform', `translate(0,${bottom})`)
      .attr('font-size', fontSizeSmall);
    this.yAxisG = this.svg
      .append('g')
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

  protected abstract renderData();

  protected abstract updateData(data: Datum[]);

  protected abstract renderActivePoint();

  protected abstract updateActivePoint(activePoint: TimeSeriesPoint | null);

  protected abstract appendLegendItemIcon(itemG: d3.Selection<SVGGElement, unknown, null, undefined>, datum: Datum);
}
