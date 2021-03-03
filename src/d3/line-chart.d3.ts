import * as d3 from 'd3';
import { XYChartD3 } from './xy-chart.d3';
import { LineChartDatum } from '../components/line-chart/line-chart.component';
import { TimeSeriesPoint } from '../datasets/metas/types';
import { formatX } from '../utils/formatters';
import { assertExists } from '../utils/misc';

export interface LegendItemStyle {
  color: string;
  width: number;
  opacity: number;
  dashes: number[];
}

interface LinePath {
  line: d3.Line<TimeSeriesPoint>;
  path: d3.Selection<SVGPathElement, unknown, null, undefined>;
}

export class LineChartD3 extends XYChartD3<TimeSeriesPoint, LineChartDatum> {
  static defaultLegendItemStyle: LegendItemStyle = {
    color: LineChartD3.primaryColor,
    width: 2,
    opacity: 1,
    dashes: [],
  };

  protected linePaths: LinePath[];
  protected activePointCircle: d3.Selection<SVGCircleElement, unknown, null, undefined>;

  protected scaleX: d3.ScaleTime<number, number>;
  protected scaleY: d3.ScaleLinear<number, number>;
  protected xAxis: d3.Axis<Date>;
  protected yAxis: d3.Axis<number>;

  x(value: Date): number {
    return assertExists(this.scaleX(value));
  }

  y(value: number) {
    return assertExists(this.scaleY(value));
  }

  protected renderData() {
    super.renderData();

    this.linePaths = [];
  }

  protected updateData(data: LineChartDatum[]) {
    const itemCount = data.length;
    const oldItemCount = this.linePaths.length;

    if (oldItemCount > itemCount) {
      const removedLinePaths = this.linePaths.splice(itemCount, oldItemCount - itemCount);
      for (const linePath of removedLinePaths) {
        linePath.path.remove();
      }
    } else {
      for (let i = 0; i < itemCount - oldItemCount; i++) {
        this.linePaths.push({
          line: d3.line<TimeSeriesPoint>(),
          path: this.dataG
            .append('path')
            .attr('fill', 'none')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round'),
        });
      }
    }

    this.linePaths.forEach(({ line, path }, i) => {
      const { style, points } = data[i];
      line
        .defined(point => !isNaN(point.y))
        .x(point => this.x(point.x))
        .y(point => this.y(point.y));
      path.call(this.styleLegendItem(style));
      path
        .datum(points)
        .transition(this.transition)
        .attr('d', line);
    });
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

  protected renderActivePoint() {
    this.activePointCircle = this.svg
      .append('circle')
      .attr('class', 'line_chart-active_point')
      .attr('r', 4)
      .attr('fill', LineChartD3.primaryColor);
  }

  protected updateActivePoint(activePoint: TimeSeriesPoint | null) {
    if (!activePoint) {
      this.activePointCircle.attr('display', 'none');
      return;
    }
    const translateX = this.x(activePoint.x);
    const translateY = this.y(activePoint.y);
    this.activePointCircle
      .transition(this.createTransition(50))
      .attr('display', 'inherit')
      .attr('transform', `translate(${translateX},${translateY})`);
  }

  protected appendLegendItemIcon(container: d3.Selection<SVGGElement, unknown, null, undefined>, datum: LineChartDatum) {
    const { legendIconWidth, legendHeight } = XYChartD3;
    container
      .append('line')
      .attr('x1', 0)
      .attr('x2', legendIconWidth)
      .attr('y1', legendHeight / 2)
      .attr('y2', legendHeight / 2)
      .call(this.styleLegendItem(datum.style));
  }

  protected styleLegendItem<T extends SVGGraphicsElement>(style?: Partial<LegendItemStyle>) {
    const { color, width, opacity, dashes } = {
      ...LineChartD3.defaultLegendItemStyle,
      ...style ?? {},
    };
    return (selection: d3.Selection<T, unknown, null, undefined>) => {
      selection
        .attr('stroke', color)
        .attr('stroke-width', width)
        .attr('opacity', opacity)
        .attr('stroke-dasharray', dashes.join(' '));
    };
  }
}
