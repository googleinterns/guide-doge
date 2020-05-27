import * as d3 from 'd3';
import { BaseD3, HandleDestroy } from './base.d3';
import { Observable } from 'rxjs';
import { t } from '../assets/i18n/utils';

export interface Datum {
  date: Date;
  value: number;
}

export interface RenderOptions {
  dataObservable: Observable<Datum[]>;
  activeDatumObservable: Observable<Datum | null>;
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export abstract class XYChartD3 extends BaseD3<RenderOptions> {
  xAxisId = this.createId('x-axis');
  yAxisId = this.createId('y-axis');

  protected render({
                     dataObservable,
                     activeDatumObservable,
                     height, width,
                     marginTop, marginRight, marginBottom, marginLeft,
                   }: RenderOptions) {
    const svg = this.container
      .append('svg')
      .attr('role', 'figure')
      .attr('aria-label', t('audification.instructions'))
      .attr('viewBox', [0, 0, width, height].join(' '));

    const scaleX = d3
      .scaleUtc()
      .range([marginLeft, width - marginRight]);

    const scaleY = d3
      .scaleLinear()
      .nice()
      .range([height - marginBottom, marginTop]);

    const xAxis = d3
      .axisBottom<Date>(scaleX)
      .ticks(width / 80)
      .tickFormat(d3.timeFormat('%B %d'))
      .tickSizeOuter(0);

    const yAxis = d3.axisLeft<number>(scaleY);

    const xAxisG = svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .attr('role', 'img')
      .attr('tabindex', -1)
      .attr('id', this.xAxisId);

    const yAxisG = svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .attr('role', 'img')
      .attr('tabindex', -1)
      .attr('id', this.yAxisId);

    const dataSubscription = dataObservable.subscribe(data => {
      scaleX.domain(d3.extent<Datum, Date>(data, d => d.date) as [Date, Date]);
      scaleY.domain([0, d3.max(data, d => d.value)!]);

      const domain = data.map(d => d.date).sort((a, b) => a.getTime() - b.getTime());
      const range = data.map(d => d.value).sort();

      const xFormatter = xAxis.tickFormat() ?? (v => v);
      const yFormatter = yAxis.tickFormat() ?? (v => v);
      const formatX = (v, index = 0) => xFormatter(v, index);
      const formatY = (v, index = 0) => yFormatter(v, index);

      xAxisG
        .transition(this.transition)
        .call(xAxis)
        .attr('aria-label', t('audification.domain', {
          min: formatX(domain[0]),
          max: formatX(domain[domain.length - 1]),
        }));

      yAxisG
        .transition(this.transition)
        .call(yAxis)
        .attr('aria-label', t('audification.range', {
          min: formatY(range[0]),
          max: formatY(range[range.length - 1]),
        }));
    });

    const handleDestroyData = this.renderData(svg, dataObservable, scaleX, scaleY);
    const handleDestroyActiveIndicator = this.renderActiveIndicator(
      svg, activeDatumObservable, scaleX, scaleY, xAxis, yAxis,
    );

    return () => {
      handleDestroyActiveIndicator();
      handleDestroyData();
      dataSubscription.unsubscribe();
      svg.remove();
    };
  }

  protected abstract renderData(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    dataObservable: Observable<Datum[]>,
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>,
  ): HandleDestroy;

  protected abstract renderActiveIndicator(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    activeDatumObservable: Observable<Datum | null>,
    scaleX: d3.ScaleTime<number, number>,
    scaleY: d3.ScaleLinear<number, number>,
    xAxis: d3.Axis<Date>,
    yAxis: d3.Axis<number>,
  ): HandleDestroy;
}
