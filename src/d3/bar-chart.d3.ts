import * as d3 from 'd3';
import { XYChartD3 } from './xy-chart.d3';
import { BarChartDatum } from '../components/bar-chart/bar-chart.component';
import { CategoricalPoint } from '../datasets/metas/types';

export interface LegendItemStyle {
  color: string;
  opacity: number;
}

export class BarChartD3 extends XYChartD3<CategoricalPoint, BarChartDatum> {
  static defaultLegendItemStyle: LegendItemStyle = {
    color: BarChartD3.primaryColor,
    opacity: 1,
  };

  protected scaleX: d3.ScaleLinear<number, number>;
  protected scaleY: d3.ScaleBand<string>;
  protected xAxis: d3.Axis<number>;
  protected yAxis: d3.Axis<string>;

  protected activePointCircle: d3.Selection<SVGCircleElement, unknown, null, undefined>;

  protected renderData() {
    super.renderData();
  }

  x(value: number) {
    return this.scaleX(value);
  }

  y(value: string) {
    return this.scaleY(value);
  }

  protected updateData(data: BarChartDatum[]) {
    const { points, style = {} } = data[0];

    this.svg.selectAll('.bar')
      .data(points)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', () => this.x(0))
      .attr('y', point => this.y(point.x) as number)
      .attr('height', this.scaleY.bandwidth())
      .attr('width', point => this.x(point.y))
      .attr('fill', style.color ?? BarChartD3.defaultLegendItemStyle.color)
      .attr('opacity', style.opacity ?? BarChartD3.defaultLegendItemStyle.opacity);
  }

  protected renderActivePoint() {
    // Bar Chart does not support active point features
  }

  protected updateActivePoint(activePoint: CategoricalPoint | null) {
    // Bar Chart does not support active point features
  }

  protected appendLegendItemIcon(container: d3.Selection<SVGGElement, unknown, null, undefined>, datum: BarChartDatum) {
    const { legendIconWidth, legendHeight } = BarChartD3;
    container
      .append('line')
      .attr('x1', 0)
      .attr('x2', legendIconWidth)
      .attr('y1', legendHeight / 2)
      .attr('y2', legendHeight / 2)
      .call(this.styleLegendItem(datum.style));
  }

  protected styleLegendItem<T extends SVGGraphicsElement>(style?: Partial<LegendItemStyle>) {
    const { color, opacity } = {
      ...BarChartD3.defaultLegendItemStyle,
      ...style ?? {},
    };
    return (selection: d3.Selection<T, unknown, null, undefined>) => {
      selection
        .attr('stroke', color)
        .attr('opacity', opacity);
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
      .scaleLinear()
      .nice()
      .range([left, right]);
    this.scaleY = d3
      .scaleBand()
      .padding(0.4)
      .range([bottom, top]);

    this.xAxis = d3.axisBottom<number>(this.scaleX);

    this.yAxis = d3
      .axisLeft<string>(this.scaleY);


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

  protected updateAxis(data: BarChartDatum[]) {
    const points = data.flatMap(datum => datum.points);
    const xs = points.map(point => point.x);
    const ys = points.map(point => point.y);
    this.scaleX.domain([0, d3.max(ys)!]);
    this.scaleY.domain(xs.reverse());

    this.xAxisG
      .transition(this.transition)
      .call(this.xAxis);
    this.yAxisG
      .transition(this.transition)
      .call(this.yAxis);
  }
}
