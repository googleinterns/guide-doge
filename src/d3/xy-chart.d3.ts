import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import { Observable } from 'rxjs';
import { formatX } from '../utils/formatters';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';
import { LineChartDatum } from '../components/line-chart/line-chart.component';
import { LineChartStyle } from './line-chart.d3';

export interface RenderOptions extends BaseRenderOptions {
  data$: Observable<LineChartDatum[]>;
  activePoint$: Observable<TimeSeriesPoint | null>;
}

export abstract class XYChartD3 extends BaseD3<RenderOptions> {
  static padding = 16;
  static yAxisWidth = 40;
  static xAxisHeight = 20;
  static legendIconWidth = 16;
  static legendIconHeight = XYChartD3.legendIconWidth;
  static legendPaddingTop = 8;
  static legendHeight = XYChartD3.legendIconHeight + XYChartD3.legendPaddingTop;
  static fontSizeSmall = 12;
  static fontSizeMedium = 14;
  static defaultLegendItemStyle: LineChartStyle = {
    color: XYChartD3.colorPrimary,
    width: 2,
    opacity: 1,
    dashes: [],
  };

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

  protected updateLegend(data: LineChartDatum[]) {
    const { legendIconWidth, legendHeight, fontSizeMedium } = XYChartD3;

    this.legendG.html('');

    let offsetX = 0;
    for (const { label, style } of data) {
      const itemG = this.legendG
        .append('g')
        .attr('transform', `translate(${offsetX}, 0)`);
      itemG
        .append('line')
        .attr('x1', 0)
        .attr('x2', legendIconWidth)
        .attr('y1', legendHeight / 2)
        .attr('y2', legendHeight / 2)
        .call(this.getLegendItemStyler(style));
      const textOffsetX = legendIconWidth + fontSizeMedium * .5;
      const measureText = itemG
        .append('text')
        .attr('font-size', fontSizeMedium)
        .attr('transform', `translate(${textOffsetX}, ${fontSizeMedium})`)
        .text(label);
      const textWidth = measureText.node()!.getBBox().width;
      offsetX += textOffsetX + textWidth + fontSizeMedium;
    }
  }

  protected getLegendItemStyler<T extends SVGGraphicsElement>(style?: Partial<LineChartStyle>) {
    const { color, width, opacity, dashes } = {
      ...XYChartD3.defaultLegendItemStyle,
      ...style ?? {},
    };

    return (stylePath: d3.Selection<T, unknown, null, undefined>) => {
      stylePath
        .attr('stroke', color)
        .attr('stroke-width', width)
        .attr('opacity', opacity)
        .attr('stroke-dasharray', dashes.join(' '));
    };
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

  protected updateAxis(data: LineChartDatum[]) {
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

  protected abstract updateData(data: LineChartDatum[]);

  protected abstract renderActivePoint();

  protected abstract updateActivePoint(activePoint: TimeSeriesPoint | null);
}
