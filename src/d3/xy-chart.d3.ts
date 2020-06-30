import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import { Observable } from 'rxjs';
import { formatX } from '../utils/formatters';
import { XYChartData, Datum } from '../datasets/types';

// TODO: Generic Datum type
export type DatumDN = Datum<Date, number>;

export interface RenderOptions extends BaseRenderOptions {
  data$: Observable<XYChartData>;
  activeDatum$: Observable<DatumDN | null>;
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

    const { data$, activeDatum$ } = this.renderOptions;

    this.renderAxis();
    this.renderData();
    this.renderActiveDatum();

    data$
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        const d = data.data;
        this.updateAxis(d);
        this.updateData(d);
      });

    activeDatum$
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
      .ticks(d3.timeWeek.every(1))
      .tickFormat(formatX);
    this.yAxis = d3.axisLeft<number>(this.scaleY);

    this.xAxisG = this.svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`);
    this.yAxisG = this.svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`);
  }

  protected updateAxis(data: DatumDN[]) {
    this.scaleX.domain(d3.extent<DatumDN, Date>(data, d => d.x) as [Date, Date]);
    this.scaleY.domain([0, d3.max(data, d => d.y)!]);

    this.xAxisG
      .transition(this.transition)
      .call(this.xAxis)
      .attr('font-size', 12);
    this.yAxisG
      .transition(this.transition)
      .call(this.yAxis)
      .attr('font-size', 12);
  }

  protected abstract renderData();

  protected abstract updateData(data: DatumDN[]);

  protected abstract renderActiveDatum();

  protected abstract updateActiveDatum(activeDatum: DatumDN | null);
}
