import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { ElementRef } from '@angular/core';

// workaround for https://github.com/angular/angular/issues/8277
export abstract class A11yHostComponent {
  private static componentKey = '__component';

  a11yPlaceholder: A11yPlaceholderDirective;

  protected constructor(elementRef: ElementRef) {
    elementRef.nativeElement[A11yHostComponent.componentKey] = this;
  }

  static getComponent(elementRef) {
    return elementRef.nativeElement[A11yHostComponent.componentKey];
  }
}
