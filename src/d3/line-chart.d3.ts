import { XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import { ResultRow } from '../models/data-cube/types';
import { LegendItem } from '../components/line-chart/line-chart.component';

interface LinePath {
  line: d3.Line<ResultRow>;
  path: d3.Selection<SVGPathElement, unknown, null, undefined>;
}

export class LineChartD3 extends XYChartD3 {
  protected linePaths: LinePath[];
  protected activeDatumCircle: d3.Selection<SVGCircleElement, unknown, null, undefined>;

  protected renderData() {
    this.linePaths = [];
  }

  protected updateData(legendItems: LegendItem[], data: ResultRow[]) {
    const itemCount = legendItems.length;
    const oldItemCount = this.linePaths.length;

    if (oldItemCount > itemCount) {
      const removedLinePaths = this.linePaths.splice(itemCount, oldItemCount - itemCount);
      for (const linePath of removedLinePaths) {
        linePath.path.remove();
      }
    } else {
      for (let i = 0; i < itemCount - oldItemCount; i++) {
        this.linePaths.push({
          line: d3.line<ResultRow>(),
          path: this.svg
            .append('path')
            .attr('fill', 'none')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round'),
        });
      }
    }

    this.linePaths.forEach(({ line, path }, i) => {
      const { measureName, style } = legendItems[i];
      line
        .defined(d => !isNaN(d.values[measureName]))
        .x(d => this.x(d.categories.date))
        .y(d => this.y(d.values[measureName]));
      path.call(this.getLegendItemStyler(style));
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
      .attr('fill', LineChartD3.colorPrimary);
  }

  protected updateActiveDatum(activeDatum: ResultRow | null) {
    if (!activeDatum) {
      this.activeDatumCircle.attr('display', 'none');
      return;
    }
    const { date } = activeDatum.categories;
    const value = activeDatum.values[Object.keys(activeDatum.values)[0]];
    this.activeDatumCircle
      .transition(this.createTransition(50))
      .attr('display', 'inherit')
      .attr('transform', `translate(${this.x(date)},${this.y(value)})`);
  }
}
