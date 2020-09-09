import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import { Observable } from 'rxjs';
import { XYDatum } from '../datasets/metas/types';

export interface RenderOptions<Point, Datum extends XYDatum<Point>> extends BaseRenderOptions {
  data$: Observable<Datum[]>;
  activePoint$?: Observable<Point | null>;
}

export abstract class XYChartD3<Point, Datum extends XYDatum<Point>> extends BaseD3<RenderOptions<Point, Datum>> {
  static padding = 16;
  static yAxisWidth = 40;
  static xAxisHeight = 20;
  static legendIconWidth = 16;
  static legendIconHeight = XYChartD3.legendIconWidth;
  static legendPaddingTop = 8;
  static legendHeight = XYChartD3.legendIconHeight + XYChartD3.legendPaddingTop;
  static fontSizeSmall = 12;
  static fontSizeMedium = 14;

  protected xAxisG: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected yAxisG: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected dataG: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected legendG: d3.Selection<SVGGElement, unknown, null, undefined>;

  render() {
    super.render();

    const { data$, activePoint$ } = this.renderOptions;

    this.renderLegend();
    this.renderAxis();
    this.renderData();
    this.renderActivePoint();

    data$
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        this.updateLegend(data);
        this.updateAxis(data);
        this.updateData(data);
      });

    if (activePoint$) {
      activePoint$
        .pipe(this.takeUntilCleared())
        .subscribe(activePoint => {
          this.updateActivePoint(activePoint);
        });
    }
  }

  protected renderLegend() {
    const { height } = this.renderOptions;
    const { legendHeight, legendPaddingTop, padding } = XYChartD3;

    const top = height - padding - legendHeight + legendPaddingTop;
    const left = padding;

    this.legendG = this.svg
      .append('g')
      .attr('class', 'xy_chart-legend')
      .attr('transform', `translate(${left},${top})`);
  }


  protected renderData() {
    this.dataG = this.svg
      .append('g')
      .attr('class', 'xy_chart-data');
  }

  protected updateLegend(data: Datum[]) {
    const { legendIconWidth, fontSizeMedium } = XYChartD3;

    this.legendG.html('');

    let offsetX = 0;
    for (const datum of data) {
      const itemG = this.legendG
        .append('g')
        .attr('transform', `translate(${offsetX}, 0)`);
      this.appendLegendItemIcon(itemG, datum);
      const textOffsetX = legendIconWidth + fontSizeMedium * .5;
      const measureText = itemG
        .append('text')
        .attr('font-size', fontSizeMedium)
        .attr('transform', `translate(${textOffsetX}, ${fontSizeMedium})`)
        .text(datum.label);
      const fallbackTextWidth = datum.label.length * fontSizeMedium / 2;
      const textWidth = measureText.node()?.getBBox?.().width ?? fallbackTextWidth;
      offsetX += textOffsetX + textWidth + fontSizeMedium;
    }
  }

  protected abstract renderAxis();

  protected abstract updateAxis(data: Datum[]);

  protected abstract updateData(data: Datum[]);

  protected abstract renderActivePoint();

  protected abstract updateActivePoint(activePoint: Point | null);

  protected abstract appendLegendItemIcon(itemG: d3.Selection<SVGGElement, unknown, null, undefined>, datum: Datum);
}
