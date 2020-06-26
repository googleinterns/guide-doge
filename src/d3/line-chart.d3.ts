import { XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import { ResultRow } from '../models/data-cube/types';

interface LinePath {
  line: d3.Line<ResultRow>;
  path: d3.Selection<SVGPathElement, unknown, null, undefined>;
}

export class LineChartD3 extends XYChartD3 {
  protected linePaths: LinePath[];
  protected activeDatumCircle: d3.Selection<SVGCircleElement, unknown, null, undefined>;
  protected activeDatumToast: d3.Selection<d3.BaseType, unknown, null, undefined>;

  protected renderData() {
    this.linePaths = [];
  }

  protected updateData(data: ResultRow[]) {
    const measureNames = this.getMeasureNames(data);
    const measureCount = measureNames.length;
    const oldMeasureCount = this.linePaths.length;

    if (oldMeasureCount > measureCount) {
      const removedLinePaths = this.linePaths.splice(measureCount, oldMeasureCount - measureCount);
      for (const linePath of removedLinePaths) {
        linePath.path.remove();
      }
    } else {
      for (let i = 0; i < measureCount - oldMeasureCount; i++) {
        this.linePaths.push({
          line: d3.line<ResultRow>(),
          path: this.svg
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', this.colorPrimary)
            .attr('stroke-width', 2)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round'),
        });
      }
    }

    this.linePaths.forEach(({ line, path }, i) => {
      const measureName = measureNames[i];
      line
        .defined(d => !isNaN(d.values[measureName]))
        .x(d => this.scaleX(d.categories.date))
        .y(d => this.scaleY(d.values[measureName]));
      path
        .datum(data)
        .transition(this.transition)
        .attr('d', line);
    });
  }

  protected renderActiveDatum() {
    this.activeDatumCircle = this.svg
      .append('circle')
      .attr('r', 4)
      .attr('fill', this.colorPrimary);
    this.activeDatumToast = this.container.select('.active-indicator');
  }

  protected updateActiveDatum(activeDatum: ResultRow | null) {
    if (!activeDatum) {
      this.activeDatumCircle.attr('display', 'none');
      this.activeDatumToast.style('opacity', 0);
      return;
    }
    const { date } = activeDatum.categories;
    const value = activeDatum.values[Object.keys(activeDatum.values)[0]];
    this.activeDatumCircle
      .transition(this.createTransition(50))
      .attr('display', 'inherit')
      .attr('transform', `translate(${this.scaleX(date)},${this.scaleY(value)})`);
    this.activeDatumToast
      .transition(this.createTransition(50))
      .style('opacity', .8)
      .style('top', `${this.scaleY(value) + 16}px`)
      .style('left', `${this.scaleX(date) - 64}px`);
  }
}
