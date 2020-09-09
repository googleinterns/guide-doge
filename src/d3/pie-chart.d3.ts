import * as math from 'mathjs';
import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import { Observable } from 'rxjs';
import { PieChartDatum } from '../components/pie-chart/pie-chart.component';
import { CategoricalPoint } from '../datasets/metas/types';

export interface LegendItemStyle {
  colorMap: string[];
}

export interface RenderOptions<Point extends CategoricalPoint, Datum extends PieChartDatum> extends BaseRenderOptions {
  data$: Observable<Datum[]>;
}

export class PieChartD3 extends BaseD3<RenderOptions<CategoricalPoint, PieChartDatum>> {
  static fontSizeSmall = 12;
  static fontSizeMedium = 14;
  static defaultLegendItemStyle: LegendItemStyle = {
    colorMap: [
      '#2F5EC4',
      '#4285F4',
      '#93D5ED',
      '#DCF7FA',
    ],
  };

  protected dataG: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected pie = d3.pie<CategoricalPoint>().value(point => point.y).sort(null);
  protected arc = d3.arc().outerRadius(200).innerRadius(140);
  protected legendG: d3.Selection<SVGGElement, unknown, null, undefined>;

  render() {
    super.render();

    const { data$ } = this.renderOptions;

    this.renderData();

    data$
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        this.updateData(data);
        this.updateLegend(data);
      });
  }

  protected renderData() {
    this.dataG = this.svg
      .append('g')
      .attr('class', 'xy_chart-data');
  }

  protected updateData(data: PieChartDatum[]) {
    const { points, style = {} } = data[0];
    const { colorMap } = { ...PieChartD3.defaultLegendItemStyle, ...style };

    const colorScale = d3.scaleOrdinal(colorMap);

    const { height, width } = this.renderOptions;
    const xCenter = width * 2 / 5;
    const yCenter = height / 2;

    this.svg
      .selectAll('slices')
      .data(this.pie(points))
      .enter()
      .append('path')
      .attr('fill', ({ data: point }) => colorScale(point.x))
      .attr('transform', `translate(${xCenter}, ${yCenter})`)
      .attr('d', this.arc as any)
      .attr('stroke', 'white')
      .attr('stroke-width', '6px');
  }

  protected updateLegend(data: PieChartDatum[]) {
    const { points, style = {} } = data[0];
    const { colorMap } = { ...PieChartD3.defaultLegendItemStyle, ...style };

    const colorScale = d3.scaleOrdinal(colorMap);

    const { height, width } = this.renderOptions;
    const legendLabelSize = PieChartD3.fontSizeMedium;
    const left = width * 0.7;
    const top = height / 2 - legendLabelSize * points.length / 2;

    const totalYSum = math.sum(points.map(({ y }) => y));
    const getPercentageText = (yValue: number) => `${(yValue / totalYSum * 100).toFixed(2)}%`;

    this.legendG = this.svg
      .append('g')
      .attr('transform', `translate(${left},${top})`);

    this.legendG
      .selectAll(null)
      .data(this.pie(points))
      .enter()
      .append('rect')
      .attr('y', ({ index }) => legendLabelSize * index * 1.8)
      .attr('width', legendLabelSize)
      .attr('height', legendLabelSize)
      .attr('fill', ({ data: point }) => colorScale(point.x))
      .attr('stroke', 'grey')
      .style('stroke-width', '1px');

    this.legendG
      .selectAll(null)
      .data(this.pie(points))
      .enter()
      .append('text')
      .text(({ data: point }) => `${point.x} (${getPercentageText(point.y)})`)
      .attr('x', legendLabelSize * 1.2)
      .attr('y', ({ index }) => legendLabelSize * index * 1.8 + legendLabelSize)
      .style('font-size', `${legendLabelSize}px`);
  }
}
