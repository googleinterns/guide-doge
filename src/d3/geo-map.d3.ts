import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import * as topojson from 'topojson';

export interface RenderOptions extends BaseRenderOptions {
  placeholder?: never;
}

export class GeoMapD3 extends BaseD3<RenderOptions> {
  static padding = 16;

  protected scaleX: d3.ScaleLinear<number, number>;
  protected scaleY: d3.ScaleLinear<number, number>;

  async render() {
    super.render();

    const { height, width } = this.renderOptions;

    const projection = d3.geoNaturalEarth1()
      .scale(153)
      .translate([width / 2, height / 2])
      .precision(.1);
    const path = d3.geoPath()
      .projection(projection);
    const graticule = d3.geoGraticule();

    const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json');

    console.log(world);
    console.log(topojson.feature(world, world.objects.land));
    console.log(graticule);

    const landPath = this.svg
      .append('path')
      .datum(topojson.feature(world, world.objects.land))
      .attr('d', path)
      .attr('fill', '#999');

    const boundaryPath = this.svg
      .append('path')
      .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', '.5px');

    const graticulePath = this.svg
      .append('path')
      .datum(graticule)
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#777')
      .attr('stroke-width', '.5px')
      .attr('stroke-opacity', '.5');
  }
}
