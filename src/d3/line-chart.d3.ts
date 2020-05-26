import { Datum, XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

export class LineChartD3 extends XYChartD3 {
  activeLabelId = this.createId('active-label');
  activeGroupId = this.createId('active-group');

  protected renderData(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    dataObservable: Observable<Datum[]>,
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>,
  ) {
    const line = d3
      .line<Datum>()
      .defined(d => !isNaN(d.value))
      .x(d => scaleX(d.date))
      .y(d => scaleY(d.value));

    const path = svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');


    const dataSubscription = dataObservable.subscribe(data => {
      path
        .datum(data)
        .transition(this.transition)
        .attr('d', line);
    });

    return () => {
      dataSubscription.unsubscribe();
    };
  }

  protected renderActiveIndicator(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    activeDatumObservable: Observable<Datum | null>,
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>,
    xAxis: d3.Axis<Date>,
    yAxis: d3.Axis<number>,
  ) {
    const g = svg
      .append('g')
      .attr('role', 'img')
      .attr('id', this.activeGroupId)
      .attr('aria-labelledby', this.activeLabelId);

    g
      .append('circle')
      .attr('r', 4)
      .attr('fill', 'steelblue');

    const text = g
      .append('text')
      .attr('id', this.activeLabelId)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10);

    const xFormatter = xAxis.tickFormat() ?? (v => v);
    const yFormatter = yAxis.tickFormat() ?? (v => v);
    const formatX = (v, index = 0) => xFormatter(v, index);
    const formatY = (v, index = 0) => yFormatter(v, index);

    const activeDatumSubscription = activeDatumObservable.subscribe(activeDatum => {
      if (!activeDatum) {
        g
          .attr('display', 'none')
          .attr('aria-hidden', true)
          .attr('tabindex', null);
        return;
      }
      const { date, value } = activeDatum;
      g
        .transition(this.createTransition(50))
        .attr('display', 'inherit')
        .attr('aria-hidden', false)
        .attr('tabindex', -1)
        .attr('transform', `translate(${scaleX(date)},${scaleY(value)})`);
      text.text(`${formatY(value)} on ${formatX(date)}`);
    });

    return () => {
      activeDatumSubscription.unsubscribe();
    };
  }
}
