import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

type Teardown = () => void;

export abstract class BaseD3<RenderOptions> {
  protected container = d3.select(this.elementRef.nativeElement);
  private teardown?: Teardown;

  constructor(private elementRef: ElementRef) {
  }

  apply(renderOptions: RenderOptions) {
    this.unapply();
    this.teardown = this.render(renderOptions);
  }

  unapply() {
    if (this.teardown) {
      this.teardown();
      this.teardown = undefined;
    }
  }

  protected abstract render(renderOptions: RenderOptions): Teardown;
}
