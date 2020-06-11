import { ComponentFactoryResolver, Directive, Type, ViewContainerRef } from '@angular/core';
import { CardFoldComponent } from '../../components/card-fold/card-fold.component';

@Directive({
  selector: '[appA11yHost]',
})
export class A11yHostDirective {
  private wrapperFactory = this.componentFactoryResolver.resolveComponentFactory(CardFoldComponent);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  addComponent<T>(A11yComponent: Type<T>, payload: Partial<T>) {
    this.viewContainerRef.clear();
    const wrapperRef = this.viewContainerRef.createComponent(this.wrapperFactory);
    const wrapper = wrapperRef.instance;

    wrapper.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(A11yComponent);
    const componentRef = wrapper.viewContainerRef.createComponent(componentFactory);
    const component = componentRef.instance;
    Object.assign(component, payload);
  }
}
