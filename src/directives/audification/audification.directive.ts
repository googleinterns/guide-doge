import { ComponentRef, Directive, Host, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { LineChartAudificationComponent } from '../../components/line-chart-audification/line-chart-audification.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';

@Directive({
  selector: '[appAudification]',
})
export class AudificationDirective implements OnInit, OnDestroy {
  audificationComponentRef: ComponentRef<unknown> | null;

  constructor(
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
    this.attach();
  }

  ngOnDestroy() {
    this.detach();
  }

  attach() {
    this.detach();

    const { host } = this;
    this.audificationComponentRef = host.a11yPlaceholder.addComponent(LineChartAudificationComponent, host);
  }

  detach() {
    if (this.audificationComponentRef) {
      this.host.a11yPlaceholder.removeComponent(this.audificationComponentRef);
      this.audificationComponentRef = null;
    }
  }
}
