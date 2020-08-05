import {
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Type,
} from '@angular/core';
import { PreferenceService } from '../../services/preference/preference.service';
import { Preference, PreferenceWithMeta } from '../../services/preference/types';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { A11yHostComponent } from '../../components/a11y-host/a11y-host.component';

type A11yComponent = Preference;

export interface LazyA11yModule<C extends A11yComponent = A11yComponent> {
  A11yComponent: Type<C>;
  preferenceKey: keyof PreferenceService;
  componentRef?: ComponentRef<C>;
}

@Directive({
  selector: '[appA11y]',
})
export class A11yDirective implements OnInit, OnDestroy {
  @Input('appA11y') a11yModuleImporters?: (() => Promise<Type<LazyA11yModule>>)[];

  private destroy$ = new Subject();

  constructor(
    private preferenceService: PreferenceService,
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
  ) {
  }

  get hostComponent() {
    return A11yHostComponent.getComponent(this.elementRef);
  }

  get viewContainerRef() {
    return this.hostComponent.a11yPlaceholder.viewContainerRef;
  }

  async ngOnInit() {
    for (const moduleImporter of this.a11yModuleImporters ?? []) {
      const Module = await moduleImporter();

      // compile the asynchronously imported module to resolve the dependencies of the a11y component
      const moduleFactory = await this.compiler.compileModuleAsync(Module);
      const moduleRef = moduleFactory.create(null);
      const module = moduleRef.instance;

      const preference$ = this.preferenceService[module.preferenceKey] as BehaviorSubject<PreferenceWithMeta<Preference>>;
      preference$
        .pipe(takeUntil(this.destroy$))
        .subscribe(preference => {
          if (preference.enabled) {
            this.attach(module, preference);
          } else {
            this.detach(module);
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async attach(module: LazyA11yModule, preference: Preference) {
    this.detach(module);

    // create a component, providing the host to be injected
    const injector = Injector.create({
      providers: [{
        provide: 'host',
        useValue: this.hostComponent,
      }],
    });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(module.A11yComponent);
    const componentRef = module.componentRef = this.viewContainerRef.createComponent(componentFactory, undefined, injector);
    const component = componentRef.instance;

    // inject preference into the component
    Object.assign(component, preference);
  }

  detach(module: LazyA11yModule) {
    if (module.componentRef) {
      const index = this.viewContainerRef.indexOf(module.componentRef.hostView);
      if (index >= 0) {
        this.viewContainerRef.remove(index);
      }
      module.componentRef.destroy();
      module.componentRef = undefined;
    }
  }
}
