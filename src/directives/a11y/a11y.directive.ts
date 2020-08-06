import {
  Compiler,
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
}

export interface A11yModuleImporter {
  preferenceKey: keyof PreferenceService;

  import(): Promise<Type<LazyA11yModule>>;
}

@Directive({
  selector: '[appA11y]',
})
export class A11yDirective implements OnInit, OnDestroy {
  @Input('appA11y') a11yModuleImporters?: A11yModuleImporter[];

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
      let componentRef: ComponentRef<A11yComponent> | null = null;
      const preference$ = this.preferenceService[moduleImporter.preferenceKey] as BehaviorSubject<PreferenceWithMeta<Preference>>;
      preference$
        .pipe(takeUntil(this.destroy$))
        .subscribe(async preference => {
          if (componentRef) {
            this.detach(componentRef);
            componentRef = null;
          }
          if (preference.enabled) {
            componentRef = await this.attach(moduleImporter, preference);
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async attach(moduleImporter: A11yModuleImporter, preference: Preference) {
    // asynchronously import the a11y module
    const Module = await moduleImporter.import();

    // compile the module to resolve the dependencies of the a11y component
    const moduleFactory = await this.compiler.compileModuleAsync(Module);
    const moduleRef = moduleFactory.create(null);
    const module = moduleRef.instance;

    // create a component, providing the host to be injected
    const injector = Injector.create({
      providers: [{
        provide: 'host',
        useValue: this.hostComponent,
      }],
    });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(module.A11yComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory, undefined, injector);
    const component = componentRef.instance;

    // inject preference into the component
    Object.assign(component, preference);

    return componentRef;
  }

  detach(componentRef: ComponentRef<A11yComponent>) {
    const index = this.viewContainerRef.indexOf(componentRef.hostView);
    if (index >= 0) {
      this.viewContainerRef.remove(index);
    }
    componentRef.destroy();
  }
}
