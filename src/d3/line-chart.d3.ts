import { Datum, XYChartD3 } from './xy-chart.d3';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

export class LineChartD3 extends XYChartD3 {
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
  ) {
    const circle = svg
      .append('circle')
      .attr('r', 4)
      .attr('fill', 'steelblue');

    const activeDatumSubscription = activeDatumObservable.subscribe(activeDatum => {
      if (!activeDatum) {
        circle.attr('display', 'none');
        return;
      }
      circle
        .transition(this.getTransition(50))
        .attr('display', 'inherit')
        .attr('cx', scaleX(activeDatum.date))
        .attr('cy', scaleY(activeDatum.value));
    });

    return () => {
      activeDatumSubscription.unsubscribe();
    };
  }
}
