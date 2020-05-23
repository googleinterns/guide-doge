import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export type DestroyHandler = () => void;

export abstract class BaseD3<RenderOptions> {
  protected container = d3.select(this.elementRef.nativeElement);
  private handleDestroy?: DestroyHandler;
  protected transition: d3.Transition<any, unknown, null, undefined> = d3.transition()
    .duration(300)
    .ease(d3.easeLinear);

  constructor(private elementRef: ElementRef) {
  }

  init(renderOptions: RenderOptions) {
    this.destroy();
    this.handleDestroy = this.render(renderOptions);
  }

  destroy() {
    if (this.handleDestroy) {
      this.handleDestroy();
      this.handleDestroy = undefined;
    }
  }

  protected abstract render(renderOptions: RenderOptions): DestroyHandler;
}
