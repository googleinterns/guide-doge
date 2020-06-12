import { ComponentFactoryResolver, Directive, Injector, Type, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appA11yHost]',
})
export class A11yHostDirective<HostComponent> {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  addComponent<T>(A11yComponent: Type<T>, host: HostComponent) {
    this.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(A11yComponent);
    const injector = Injector.create({
      providers: [{
        provide: 'host',
        useValue: host,
      }],
    });
    const componentRef = this.viewContainerRef.createComponent(componentFactory, 0, injector);
    return componentRef.instance;
  }
}
