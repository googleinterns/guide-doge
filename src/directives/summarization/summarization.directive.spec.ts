import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummarizationDirective } from './summarization.directive';
import { Component, ViewChild } from '@angular/core';
import { SummarizationModule } from './summarization.module';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { PreferenceService } from '../../services/preference/preference.service';
import { A11yPlaceholderModule } from '../a11y-placeholder/a11y-placeholder.module';
import { MatCardModule } from '@angular/material/card';

describe('SummarizationDirective', () => {
  @Component({
    selector: 'app-wrapper',
    template: `
      <app-line-chart appSummarization></app-line-chart>`,
  })
  class WrapperComponent {
    @ViewChild(LineChartComponent, { static: true }) hostComponent: LineChartComponent;
    @ViewChild(SummarizationDirective, { static: true }) directive: SummarizationDirective;
  }

  let preferenceService: PreferenceService;
  let fixture: ComponentFixture<WrapperComponent>;
  let wrapperComponent: WrapperComponent;
  let hostComponent: LineChartComponent;
  let directive: SummarizationDirective;
  const mockSummarizationPreference = {
    enabled: true,
    validityThreshold: 0.5,
  };

  beforeEach(() => {
    preferenceService = new PreferenceService();

    TestBed.configureTestingModule({
      imports: [
        SummarizationModule,
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
    expect(directive).toBeInstanceOf(SummarizationDirective);
  });

  it('should get the host correctly.', () => {
    expect(directive.host).toBe(hostComponent);
  });

  it('should attach or detach summarization as the preference changes.', () => {
    directive.ngOnInit();

    const summarizationPreference = preferenceService.summarization$.value;
    spyOn(directive, 'attach');
    preferenceService.summarization$.next({
      ...summarizationPreference,
      enabled: true,
    });
    expect(directive.attach).toHaveBeenCalled();

    spyOn(directive, 'detach');
    preferenceService.summarization$.next({
      ...summarizationPreference,
      enabled: false,
    });
    expect(directive.detach).toHaveBeenCalled();
  });

  it('should add a component to the a11y placeholder when attaching summarization.', async () => {
    spyOn(hostComponent.a11yPlaceholder, 'addComponent');
    await directive.attach(mockSummarizationPreference);
    expect(hostComponent.a11yPlaceholder.addComponent).toHaveBeenCalled();
  });

  it('should remove a component from the a11y placeholder when detaching summarization.', async () => {
    await directive.attach(mockSummarizationPreference);
    spyOn(hostComponent.a11yPlaceholder, 'removeComponent');
    directive.detach();
    expect(hostComponent.a11yPlaceholder.removeComponent).toHaveBeenCalled();
  });
});
