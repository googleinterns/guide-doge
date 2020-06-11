import { Component, ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-fold',
  templateUrl: './fold.component.html',
  styleUrls: ['./fold.component.scss'],
})
export class FoldComponent {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  addComponent<T>(A11yComponent: Type<T>, payload: Partial<T>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(A11yComponent);

    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    Object.assign(componentRef.instance, payload);
  }
}
