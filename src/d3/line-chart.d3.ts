import { XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';

export interface LineChartStyle {
  color: string;
  width: number;
  opacity: number;
  dashes: number[];
}

export class LineChartD3 extends XYChartD3 {
  protected line: d3.Line<TimeSeriesPoint>;
  protected path: d3.Selection<SVGPathElement, unknown, null, undefined>;
  protected activeDatumCircle: d3.Selection<SVGCircleElement, unknown, null, undefined>;
  protected activeDatumToast: d3.Selection<d3.BaseType, unknown, null, undefined>;

  protected renderData() {
    this.line = d3
      .line<TimeSeriesPoint>()
      .defined(d => !isNaN(d.y))
      .x(d => this.scaleX(d.x))
      .y(d => this.scaleY(d.y));

    this.path = this.svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', this.colorHighlight)
      .attr('stroke-width', 2)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');
  }

  protected updateData(data: TimeSeriesPoint[]) {
    this.path
      .datum(data)
      .transition(this.transition)
      .attr('d', this.line);
  }

  protected renderActiveDatum() {
    this.activeDatumCircle = this.svg
      .append('circle')
      .attr('r', 4)
      .attr('fill', this.colorHighlight);
    this.activeDatumToast = this.container.select('.active-indicator');
  }

  protected updateActiveDatum(activeDatum: TimeSeriesPoint | null) {
    if (!activeDatum) {
      this.activeDatumCircle.attr('display', 'none');
      this.activeDatumToast.style('opacity', 0);
      return;
    }
    const { x, y } = activeDatum;
    this.activeDatumCircle
      .transition(this.createTransition(50))
      .attr('display', 'inherit')
      .attr('transform', `translate(${this.scaleX(x)},${this.scaleY(y)})`);
    this.activeDatumToast
      .transition(this.createTransition(50))
      .style('opacity', .8)
      .style('top', `${this.scaleY(y) + 16}px`)
      .style('left', `${this.scaleX(x) - 64}px`);
  }
}
