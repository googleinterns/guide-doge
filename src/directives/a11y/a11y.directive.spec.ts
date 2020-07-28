import { ComponentFixture, TestBed } from '@angular/core/testing';
import { A11yDirective } from './a11y.directive';
import { Component, ViewChild } from '@angular/core';
import { A11yModule } from './a11y.module';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { PreferenceService } from '../../services/preference/preference.service';
import { LineChartModule } from '../../components/line-chart/line-chart.module';
import { importAudificationModule } from '../../components/line-chart-audification/line-chart-audification.importer';
import { importSummarizationModule } from '../../components/chart-summarization/chart-summarization.importer';

describe('A11yDirective', () => {
  @Component({
    selector: 'app-wrapper',
    template: `
      <app-line-chart [appA11y]></app-line-chart>`,
  })
  class WrapperComponent {
    @ViewChild(LineChartComponent, { static: true }) hostComponent: LineChartComponent;
    @ViewChild(A11yDirective, { static: true }) directive: A11yDirective;
  }

  let preferenceService: PreferenceService;
  let fixture: ComponentFixture<WrapperComponent>;
  let wrapperComponent: WrapperComponent;
  let hostComponent: LineChartComponent;
  let directive: A11yDirective;

  beforeEach(() => {
    preferenceService = new PreferenceService();

    TestBed.configureTestingModule({
      imports: [
        A11yModule,
        LineChartModule,
      ],
      providers: [
        { provide: PreferenceService, useValue: preferenceService },
      ],
      declarations: [
        WrapperComponent,
      ],
    });
    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.componentInstance;
    directive = wrapperComponent.directive;
    hostComponent = wrapperComponent.hostComponent;
  });

  it('should instantiate.', () => {
    expect(directive).toBeInstanceOf(A11yDirective);
  });

  it('should get the host component correctly.', () => {
    expect(directive.hostComponent).toBe(hostComponent);
  });

  it('should attach or detach audification as the preference changes.', async () => {
    directive.a11yModuleImporters = [importAudificationModule, importSummarizationModule];
    await directive.ngOnInit();

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
});
