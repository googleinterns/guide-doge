import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudificationDirective } from './audification.directive';
import { Component, ViewChild } from '@angular/core';
import { AudificationModule } from './audification.module';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { mockAudificationPreference } from '../../utils/mocks.spec';
import { PreferenceService } from '../../services/preference/preference.service';
import { A11yPlaceholderModule } from '../a11y-placeholder/a11y-placeholder.module';
import { MatCardModule } from '@angular/material/card';

describe('AudificationDirective', () => {
  @Component({
    selector: 'app-wrapper',
    template: `
      <app-line-chart appAudification></app-line-chart>`,
  })
  class WrapperComponent {
    @ViewChild(LineChartComponent, { static: true }) hostComponent: LineChartComponent;
    @ViewChild(AudificationDirective, { static: true }) directive: AudificationDirective;
  }

  let preferenceService: PreferenceService;
  let fixture: ComponentFixture<WrapperComponent>;
  let wrapperComponent: WrapperComponent;
  let hostComponent: LineChartComponent;
  let directive: AudificationDirective;

  beforeEach(() => {
    preferenceService = new PreferenceService();

    TestBed.configureTestingModule({
      imports: [
        AudificationModule,
        A11yPlaceholderModule,
        MatCardModule,
      ],
      providers: [
        { provide: PreferenceService, useValue: preferenceService }
      ],
      declarations: [
        LineChartComponent,
        WrapperComponent,
      ],
    });
    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.componentInstance;
    directive = wrapperComponent.directive;
    hostComponent = wrapperComponent.hostComponent;
  });

  it('should instantiate.', () => {
    expect(directive).toBeInstanceOf(AudificationDirective);
  });

  it('should get the host correctly.', () => {
    expect(directive.host).toBe(hostComponent);
  });

  it('should attach or detach audification as the preference changes.', () => {
    directive.ngOnInit();

    const audificationPreference = preferenceService.audification$.value;
    spyOn(directive, 'attach');
    preferenceService.audification$.next({
      ...audificationPreference,
      enabled: true,
    });
    expect(directive.attach).toHaveBeenCalled();

    spyOn(directive, 'detach');
    preferenceService.audification$.next({
      ...audificationPreference,
      enabled: false,
    });
    expect(directive.detach).toHaveBeenCalled();
  });

  it('should add a component to the a11y placeholder when attaching audification.', async () => {
    spyOn(hostComponent.a11yPlaceholder, 'addComponent');
    await directive.attach(mockAudificationPreference);
    expect(hostComponent.a11yPlaceholder.addComponent).toHaveBeenCalled();
  });

  it('should remove a component from the a11y placeholder when detaching audification.', async () => {
    await directive.attach(mockAudificationPreference);
    spyOn(hostComponent.a11yPlaceholder, 'removeComponent');
    directive.detach();
    expect(hostComponent.a11yPlaceholder.removeComponent).toHaveBeenCalled();
  });
});
