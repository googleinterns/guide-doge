import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import { Observable } from 'rxjs';
import { formatX } from '../utils/formatters';

export interface Datum {
  date: Date;
  value: number;
}

export interface RenderOptions extends BaseRenderOptions {
  dataObservable: Observable<Datum[]>;
  activeDatumObservable: Observable<Datum | null>;
}

export abstract class XYChartD3 extends BaseD3<RenderOptions> {
  protected scaleX: d3.ScaleTime<number, number>;
  protected scaleY: d3.ScaleLinear<number, number>;
  protected xAxis: d3.Axis<Date>;
  protected yAxis: d3.Axis<number>;
  protected xAxisG: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected yAxisG: d3.Selection<SVGGElement, unknown, null, undefined>;

  render() {
    super.render();

    const {
      dataObservable, activeDatumObservable,
    } = this.renderOptions;

    this.renderAxis();
    this.renderData();
    this.renderActiveDatum();

    dataObservable
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        this.updateAxis(data);
        this.updateData(data);
      });

    activeDatumObservable
      .pipe(this.takeUntilCleared())
      .subscribe(activeDatum => {
        this.updateActiveDatum(activeDatum);
      });
  }

  protected renderAxis() {
    const {
      height, width,
      marginTop, marginRight, marginBottom, marginLeft,
    } = this.renderOptions;

    this.scaleX = d3
      .scaleUtc()
      .range([marginLeft, width - marginRight]);
    this.scaleY = d3
      .scaleLinear()
      .nice()
      .range([height - marginBottom, marginTop]);

    this.xAxis = d3
      .axisBottom<Date>(this.scaleX)
      .ticks(width / 80)
      .tickFormat(formatX)
      .tickSizeOuter(0);
    this.yAxis = d3.axisLeft<number>(this.scaleY);

    this.xAxisG = this.svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`);
    this.yAxisG = this.svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`);
  }

  protected updateAxis(data: Datum[]) {
    this.scaleX.domain(d3.extent<Datum, Date>(data, d => d.date) as [Date, Date]);
    this.scaleY.domain([0, d3.max(data, d => d.value)!]);

    this.xAxisG
      .transition(this.transition)
      .call(this.xAxis);
    this.yAxisG
      .transition(this.transition)
      .call(this.yAxis);
  }

  protected abstract renderData();

  protected abstract updateData(data: Datum[]);

  protected abstract renderActiveDatum();

  protected abstract updateActiveDatum(activeDatum: Datum | null);
}
