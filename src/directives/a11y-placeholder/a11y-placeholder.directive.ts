import { ComponentFactoryResolver, ComponentRef, Directive, Injector, Type, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appA11yPlaceholder]',
})
export class A11yPlaceholderDirective<Host> {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  addComponent<T>(A11yComponent: Type<T>, host: Host) {
    this.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(A11yComponent);
    const injector = Injector.create({
      providers: [{
        provide: 'host',
        useValue: host,
      }],
    });
    return this.viewContainerRef.createComponent(componentFactory, 0, injector);
  }

  removeComponent<T>(componentRef: ComponentRef<T>) {
    const index = this.viewContainerRef.indexOf(componentRef.hostView);
    if (index >= 0) {
      this.viewContainerRef.remove(index);
    }
    componentRef.destroy();
  }
}
