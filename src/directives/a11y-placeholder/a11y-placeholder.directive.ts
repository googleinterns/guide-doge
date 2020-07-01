import { Compiler, ComponentFactoryResolver, ComponentRef, Directive, Injector, Type, ViewContainerRef } from '@angular/core';
import { Preference } from '../../services/preference/types';
import { LazyA11yModule } from './types';

@Directive({
  selector: '[appA11yPlaceholder]',
})
export class A11yPlaceholderDirective<Host> {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private compiler: Compiler,
  ) {
  }

  async addComponent<Component>(A11yModule: Type<LazyA11yModule<Component>>, host: Host, preference: Preference) {
    this.viewContainerRef.clear();

    // compile the asynchronously imported module to resolve the dependencies of the a11y component
    const moduleFactory = await this.compiler.compileModuleAsync(A11yModule);
    const moduleRef = moduleFactory.create(null);
    const module = moduleRef.instance;

    // create a component, providing the host to be injected
    const injector = Injector.create({
      providers: [{
        provide: 'host',
        useValue: host,
      }],
    });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(module.A11yComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory, 0, injector);
    const component = componentRef.instance;
    Object.assign(component, preference);
    return componentRef;
  }

  removeComponent<Component>(componentRef: ComponentRef<Component>) {
    const index = this.viewContainerRef.indexOf(componentRef.hostView);
    if (index >= 0) {
      this.viewContainerRef.remove(index);
    }
    componentRef.destroy();
  }
}
