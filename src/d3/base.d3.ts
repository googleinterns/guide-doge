import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface RenderOptions {
  elementRef: ElementRef<HTMLElement>;
  width: number;
  height: number;
}

export abstract class BaseD3<T extends RenderOptions> {
  static primaryColor = 'rgb(33, 150, 243)';

  private clear$?: Subject<undefined>;

  constructor(protected renderOptions: T) {
  }

  protected get transition() {
    return this.createTransition(300);
  }

  protected get container() {
    return d3.select(this.renderOptions.elementRef.nativeElement);
  }

  protected get svg(): d3.Selection<SVGSVGElement, unknown, null, undefined> {
    return this.container.select('svg');
  }

  protected get svgElement() {
    return this.svg.node()!;
  }

  config(renderOptions: T) {
    this.renderOptions = renderOptions;
    return this;
  }

  render() {
    const { width, height } = this.renderOptions;

    this.clear();
    this.clear$ = new Subject();

    this.svg.attr('viewBox', [0, 0, width, height].join(' '));
  }

  clear() {
    if (!this.clear$) {
      return;
    }
    this.clear$.next();
    this.clear$.complete();
    this.clear$ = undefined;

    this.svg.html('');
  }

  protected takeUntilCleared<R>(): MonoTypeOperatorFunction<R> {
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
