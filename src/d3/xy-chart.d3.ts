import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import { Observable } from 'rxjs';
import { formatX } from '../utils/formatters';
import { takeUntil } from 'rxjs/operators';

export interface Datum {
  date: Date;
  value: number;
}

export interface RenderOptions extends BaseRenderOptions {
  dataObservable: Observable<Datum[]>;
  activeDatumObservable: Observable<Datum | null>;
}

export abstract class XYChartD3 extends BaseD3 {
  protected scaleX: d3.ScaleTime<number, number>;
  protected scaleY: d3.ScaleLinear<number, number>;

  render(renderOptions: RenderOptions) {
    super.render(renderOptions);

    const {
      dataObservable,
      height, width,
      marginTop, marginRight, marginBottom, marginLeft,
    } = renderOptions;

    this.scaleX = d3
      .scaleUtc()
      .range([marginLeft, width - marginRight]);

    this.scaleY = d3
      .scaleLinear()
      .nice()
      .range([height - marginBottom, marginTop]);

    const xAxis = d3
      .axisBottom<Date>(this.scaleX)
      .ticks(width / 80)
      .tickFormat(formatX)
      .tickSizeOuter(0);

    const yAxis = d3.axisLeft<number>(this.scaleY);

    const xAxisG = this.svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`);

    const yAxisG = this.svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`);

    dataObservable
      .pipe(takeUntil(this.clear$))
      .subscribe(data => {
        this.scaleX.domain(d3.extent<Datum, Date>(data, d => d.date) as [Date, Date]);
        this.scaleY.domain([0, d3.max(data, d => d.value)!]);

        xAxisG
          .transition(this.transition)
          .call(xAxis);

        yAxisG
          .transition(this.transition)
          .call(yAxis);
      });

    this.renderData(renderOptions);
    this.renderActiveIndicator(renderOptions);
  }

  protected abstract renderData(renderOptions: RenderOptions);

  protected abstract renderActiveIndicator(renderOptions: RenderOptions);
}
