import { Datum, XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import { AUDIFICATION, t } from '../assets/i18n';
import { formatX, formatY } from '../utils/formatters';

export class LineChartD3 extends XYChartD3 {
  protected line: d3.Line<Datum>;
  protected path: d3.Selection<SVGPathElement, unknown, null, undefined>;
  protected activeDatumG: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected activeDatumText: d3.Selection<SVGTextElement, unknown, null, undefined>;

  protected renderData() {
    this.line = d3
      .line<Datum>()
      .defined(d => !isNaN(d.value))
      .x(d => this.scaleX(d.date))
      .y(d => this.scaleY(d.value));

    this.path = this.svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');
  }

  protected updateData(data: Datum[]) {
    this.path
      .datum(data)
      .transition(this.transition)
      .attr('d', this.line);
  }

  protected renderActiveDatum() {
    this.activeDatumG = this.svg
      .append('g');

    this.activeDatumG
      .append('circle')
      .attr('r', 4)
      .attr('fill', 'steelblue');

    this.activeDatumText = this.activeDatumG
      .append('text')
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10);
  }

  protected updateActiveDatum(activeDatum: Datum | null) {
    if (!activeDatum) {
      this.activeDatumG.attr('display', 'none');
      return;
    }
    const { date, value } = activeDatum;
    this.activeDatumG
      .transition(this.createTransition(50))
      .attr('display', 'inherit')
      .attr('transform', `translate(${this.scaleX(date)},${this.scaleY(value)})`);
    this.activeDatumText.text(t(AUDIFICATION.ACTIVE_DATUM, {
      x: formatX(date),
      y: formatY(value),
    }));
  }
}
