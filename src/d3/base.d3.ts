import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Subject } from 'rxjs';

export interface RenderOptions {
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export abstract class BaseD3 {
  protected container = d3.select(this.elementRef.nativeElement);
  protected svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  protected clear$ = new Subject();
  protected rendered = false;

  constructor(private elementRef: ElementRef) {
  }

  protected get transition() {
    return this.createTransition(300);
  }

  render({ width, height }: RenderOptions) {
    this.clear();
    this.rendered = true;

    this.svg = this.container
      .append('svg')
      .attr('viewBox', [0, 0, width, height].join(' '));
  }

  clear() {
    if (!this.rendered) {
      return;
    }
    this.rendered = false;

    this.clear$.next();
    this.svg.remove();
  }

  protected createTransition(duration: number): d3.Transition<any, unknown, null, undefined> {
    return d3.transition()
      .duration(duration)
      .ease(d3.easeLinear);
  }
}
