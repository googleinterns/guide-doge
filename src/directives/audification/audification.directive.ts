import { ComponentRef, Directive, Host, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { LineChartAudificationComponent } from '../../components/line-chart-audification/line-chart-audification.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { PreferenceService } from '../../services/preference/preference.service';
import { AudificationPreference } from '../../services/preference/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appAudification]',
})
export class AudificationDirective implements OnInit, OnDestroy {
  private audificationComponentRef: ComponentRef<unknown> | null;
  private destroy$ = new Subject();

  constructor(
    public preferenceService: PreferenceService,
    // candidate host components
    @Host() @Self() @Optional() private lineChartComponent: LineChartComponent | null,
    // @Host() @Self() @Optional() private barChartComponent: BarChartComponent | null,
    // etc.
  ) {
  }

  get host() {
    const component = this.lineChartComponent; // later it will be like: this.lineChartComponent || this.barChartComponent || ...
    if (!component) {
      throw new Error('The component does not support audification.');
    }
    return component;
  }

  ngOnInit() {
    this.preferenceService.audification$
      .pipe(takeUntil(this.destroy$))
      .subscribe(preference => {
        if (preference.enabled) {
          this.attach(preference);
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

  attach(preference: AudificationPreference) {
    this.detach();

    const { host } = this;
    this.audificationComponentRef = host.a11yPlaceholder.addComponent(LineChartAudificationComponent, host, preference);
  }

  detach() {
    if (this.audificationComponentRef) {
      this.host.a11yPlaceholder.removeComponent(this.audificationComponentRef);
      this.audificationComponentRef = null;
    }
  }
}
