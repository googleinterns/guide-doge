import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private clear$?: Subject<undefined>;

  constructor(private elementRef: ElementRef) {
  }

  protected get transition() {
    return this.createTransition(300);
  }

  render({ width, height }: RenderOptions) {
    this.clear();
    this.clear$ = new Subject();

    this.svg = this.container
      .append('svg')
      .attr('viewBox', [0, 0, width, height].join(' '));
  }

  clear() {
    if (!this.clear$) {
      return;
    }
    this.clear$.next();
    this.clear$.complete();
    this.clear$ = undefined;

    this.svg.remove();
  }

  protected takeUntilCleared<T>(): MonoTypeOperatorFunction<T> {
    if (!this.clear$) {
      throw new Error(`Subject 'clear$' is not defined.`);
    }
    return takeUntil(this.clear$);
  }

  protected createTransition(duration: number): d3.Transition<any, unknown, null, undefined> {
    return d3.transition()
      .duration(duration)
      .ease(d3.easeLinear);
  }
}
