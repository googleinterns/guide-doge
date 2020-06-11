import { Component, ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-card-fold',
  templateUrl: './card-fold.component.html',
  styleUrls: ['./card-fold.component.scss'],
})
export class CardFoldComponent {
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
