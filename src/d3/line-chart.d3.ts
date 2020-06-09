import { Datum, RenderOptions, XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import { AUDIFICATION, t } from '../assets/i18n';
import { formatX, formatY } from '../utils/formatters';
import { takeUntil } from 'rxjs/operators';

export class LineChartD3 extends XYChartD3 {
  render(renderOptions: RenderOptions) {
    super.render(renderOptions);
  }

  protected renderData({ dataObservable }: RenderOptions) {
    const line = d3
      .line<Datum>()
      .defined(d => !isNaN(d.value))
      .x(d => this.scaleX(d.date))
      .y(d => this.scaleY(d.value));

    const path = this.svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');

    dataObservable
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        path
          .datum(data)
          .transition(this.transition)
          .attr('d', line);
      });
  }

  protected renderActiveIndicator({ activeDatumObservable }: RenderOptions) {
    const g = this.svg
      .append('g');

    g
      .append('circle')
      .attr('r', 4)
      .attr('fill', 'steelblue');

    const text = g
      .append('text')
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10);

    activeDatumObservable
      .pipe(this.takeUntilCleared())
      .subscribe(activeDatum => {
        if (!activeDatum) {
          g.attr('display', 'none');
          return;
        }
        const { date, value } = activeDatum;
        g
          .transition(this.createTransition(50))
          .attr('display', 'inherit')
          .attr('transform', `translate(${this.scaleX(date)},${this.scaleY(value)})`);
        text.text(t(AUDIFICATION.ACTIVE_DATUM, {
          x: formatX(date),
          y: formatY(value),
        }));
      });
  }
}
