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
      .attr('stroke', this.colorHighlight)
      .attr('stroke-width', 2)
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
      path.remove();
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
    const circle = svg
      .append('circle')
      .attr('r', 4)
      .attr('fill', this.colorHighlight);

    const toast = this.container.select('.active-indicator');

    const activeDatumSubscription = activeDatumObservable.subscribe(activeDatum => {
      if (!activeDatum) {
        circle.attr('display', 'none');
        toast.style('opacity', 0);
        return;
      }
      const { date, value } = activeDatum;
      circle
        .transition(this.createTransition(50))
        .attr('display', 'inherit')
        .attr('transform', `translate(${scaleX(date)},${scaleY(value)})`);
      toast
        .transition(this.createTransition(50))
        .style('opacity', .8)
        .style('top', `${scaleY(value) + 16}px`)
        .style('left', `${scaleX(date) - 64}px`);
    });

    return () => {
      activeDatumSubscription.unsubscribe();
      circle.remove();
    };
  }
}
