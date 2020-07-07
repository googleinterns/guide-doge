import { XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import { LineChartDatum } from '../components/line-chart/line-chart.component';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';

export interface LineChartStyle {
  color: string;
  width: number;
  opacity: number;
  dashes: number[];
}

interface LinePath {
  line: d3.Line<TimeSeriesPoint>;
  path: d3.Selection<SVGPathElement, unknown, null, undefined>;
}

export class LineChartD3 extends XYChartD3 {
  protected linePaths: LinePath[];
  protected activePointCircle: d3.Selection<SVGCircleElement, unknown, null, undefined>;

  protected renderData() {
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
          path: this.svg
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
      path.call(this.getLegendItemStyler(style));
      path
        .datum(points)
        .transition(this.transition)
        .attr('d', line);
    });

  }

  protected renderActivePoint() {
    this.activePointCircle = this.svg
      .append('circle')
      .attr('r', 4)
      .attr('fill', LineChartD3.colorPrimary);
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
}
