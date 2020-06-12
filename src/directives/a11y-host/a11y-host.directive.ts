import { ComponentFactoryResolver, Directive, Type, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appA11yHost]',
})
export class A11yHostDirective {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  addComponent<T>(A11yComponent: Type<T>, payload: Partial<T>) {
    this.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(A11yComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const component = componentRef.instance;
    Object.assign(component, payload);
  }
}
