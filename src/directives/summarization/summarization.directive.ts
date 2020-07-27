import { ComponentRef, Directive, Host, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { PreferenceService } from '../../services/preference/preference.service';
import { SummarizationPreference } from '../../services/preference/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appSummarization]',
})
export class SummarizationDirective implements OnInit, OnDestroy {
  private summarizationComponentRef: ComponentRef<unknown> | null;
  private destroy$ = new Subject();

  constructor(
    private preferenceService: PreferenceService,
    // candidate host components
    @Host() @Self() @Optional() private lineChartComponent: LineChartComponent | null,
    // @Host() @Self() @Optional() private barChartComponent: BarChartComponent | null,
    // etc.
  ) {
  }

  get host() {
    // TODO: support multiple component types when available in `this.lineChartComponent || this.barChartComponent || ...`
    const component = this.lineChartComponent;
    if (!component) {
      throw new Error('The component does not support summarization.');
    }
    return component;
  }

  ngOnInit() {
    this.preferenceService.summarization$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async preference => {
        if (preference.enabled) {
          await this.attach(preference);
        } else {
          this.detach();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.detach();
  }

  async attach(preference: SummarizationPreference) {
    this.detach();

    const { host } = this;
    const { ChartSummarizationModule } = await import('../../components/chart-summarization/chart-summarization.module');
    this.summarizationComponentRef = await host.a11yPlaceholder.addComponent(ChartSummarizationModule, host, preference);
  }

  detach() {
    if (this.summarizationComponentRef) {
      this.host.a11yPlaceholder.removeComponent(this.summarizationComponentRef);
      this.summarizationComponentRef = null;
    }
  }
}
