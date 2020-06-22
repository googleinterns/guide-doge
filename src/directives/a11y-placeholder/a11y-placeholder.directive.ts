import { ComponentFactoryResolver, ComponentRef, Directive, Injector, Type, ViewContainerRef } from '@angular/core';
import { Preference } from '../../services/preference/types';

@Directive({
  selector: '[appA11yPlaceholder]',
})
export class A11yPlaceholderDirective<Host> {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  addComponent<T>(A11yComponent: Type<T>, host: Host, preference: Preference) {
    this.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(A11yComponent);
    const injector = Injector.create({
      providers: [{
        provide: 'host',
        useValue: host,
      }],
    });
    const componentRef = this.viewContainerRef.createComponent(componentFactory, 0, injector);
    Object.assign(componentRef.instance, preference);
    return componentRef;
  }

  removeComponent<T>(componentRef: ComponentRef<T>) {
    const index = this.viewContainerRef.indexOf(componentRef.hostView);
    if (index >= 0) {
      this.viewContainerRef.remove(index);
    }
    componentRef.destroy();
  }
}
