import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as uuid from 'uuid';

export type HandleDestroy = () => void;

export abstract class BaseD3<RenderOptions> {
  protected container = d3.select(this.elementRef.nativeElement);
  protected idSuffix = uuid.v4();
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

  protected createId(prefix: string) {
    return `${prefix}-${this.idSuffix}`;
  }

  protected createTransition(duration: number): d3.Transition<any, unknown, null, undefined> {
    return d3.transition()
      .duration(duration)
      .ease(d3.easeLinear);
  }

  protected abstract render(renderOptions: RenderOptions): HandleDestroy;
}
