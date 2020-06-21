import { ComponentFixture, TestBed } from '@angular/core/testing';
import { A11yPlaceholderDirective } from './a11y-placeholder.directive';
import { Component, ViewChild } from '@angular/core';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { A11yPlaceholderModule } from './a11y-placeholder.module';
import { mockPreference } from '../../utils/mocks.spec';
import createSpy = jasmine.createSpy;

describe('A11yPlaceholderDirective', () => {
  @Component({
    selector: 'app-wrapper',
    template: `
      <ng-template appA11yPlaceholder></ng-template>`,
  })
  class WrapperComponent {
    @ViewChild(LineChartComponent, { static: true }) hostComponent: LineChartComponent;
    @ViewChild(A11yPlaceholderDirective, { static: true }) directive: A11yPlaceholderDirective<WrapperComponent>;
  }

  @Component({
    selector: 'app-a11y',
    template: '',
  })
  class A11yComponent {
  }

  let fixture: ComponentFixture<WrapperComponent>;
  let wrapperComponent: WrapperComponent;
  let directive: A11yPlaceholderDirective<WrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        A11yPlaceholderModule,
      ],
      declarations: [
        WrapperComponent,
      ],
    });
    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.componentInstance;
    directive = wrapperComponent.directive;
  });

  it('should instantiate.', () => {
    expect(directive).toBeInstanceOf(A11yPlaceholderDirective);
  });

  it('should add a component.', () => {
    const componentRef = directive.addComponent(A11yComponent, wrapperComponent, mockPreference);
    expect(componentRef.instance).toBeInstanceOf(A11yComponent);
  });

  it('should remove a component.', () => {
    const componentRef = directive.addComponent(A11yComponent, wrapperComponent, mockPreference);
    const destroyCallback = createSpy();
    componentRef.onDestroy(destroyCallback);
    directive.removeComponent(componentRef);
    expect(destroyCallback).toHaveBeenCalled();
  });
});
