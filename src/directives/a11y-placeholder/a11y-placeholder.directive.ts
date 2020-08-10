import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appA11yPlaceholder]',
})
export class A11yPlaceholderDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
  ) {
  }
}
