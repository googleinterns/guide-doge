import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';

export interface RenderOptions extends BaseRenderOptions {
  placeholder?: never;
}

export class GeoMapD3 extends BaseD3<RenderOptions> {
  static padding = 16;

  protected scaleX: d3.ScaleLinear<number, number>;
  protected scaleY: d3.ScaleLinear<number, number>;

  render() {
    super.render();
  }
}
