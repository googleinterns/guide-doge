import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export type HandleDestroy = () => void;

export abstract class BaseD3<RenderOptions> {
  protected colorFont = 'rgb(34, 34, 34)';
  protected colorHighlight = 'rgb(66, 133, 244)';

  protected container = d3.select(this.elementRef.nativeElement);
  private handleDestroy?: HandleDestroy;

  constructor(private elementRef: ElementRef) {
  }

  protected get transition() {
    return this.createTransition(300);
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

  protected createTransition(duration: number): d3.Transition<any, unknown, null, undefined> {
    return d3.transition()
      .duration(duration)
      .ease(d3.easeLinear);
  }

  protected abstract render(renderOptions: RenderOptions): HandleDestroy;
}
