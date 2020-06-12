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
  ) {
  }

  get component() {
    const component = this.lineChartComponent;
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

    const { component } = this;
    this.audificationComponentRef = component.a11yHost.addComponent(LineChartAudificationComponent, component);
  }

  detach() {
    if (this.audificationComponentRef) {
      this.component.a11yHost.removeComponent(this.audificationComponentRef);
      this.audificationComponentRef = null;
    }
  }
}
