import { ComponentFactoryResolver, Directive, Type, ViewContainerRef } from '@angular/core';
import { FoldComponent } from '../../components/fold/fold.component';

@Directive({
  selector: '[appA11yHost]',
})
export class A11yHostDirective {
  wrapperFactory = this.componentFactoryResolver.resolveComponentFactory(FoldComponent);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  addComponent<T>(A11yComponent: Type<T>, payload: Partial<T>) {
    this.viewContainerRef.clear();
    const wrapperRef = this.viewContainerRef.createComponent(this.wrapperFactory);
    wrapperRef.instance.addComponent(A11yComponent, payload);
  }
}
