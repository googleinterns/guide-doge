import { Directive, Host, OnInit, Optional, Self } from '@angular/core';
import { LineChartAudificationComponent } from '../../components/line-chart-audification/line-chart-audification.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';

@Directive({
  selector: '[appAudification]',
})
export class AudificationDirective implements OnInit {
  constructor(
    // candidate host components
    @Host() @Self() @Optional() private lineChartComponent: LineChartComponent | null,
    // @Host() @Self() @Optional() private barChartComponent: BarChartComponent | null,
  ) {
  }

  ngOnInit() {
    this.attach();
  }

  attach() {
    if (this.lineChartComponent) {
      this.lineChartComponent.a11yHost.addComponent(LineChartAudificationComponent, this.lineChartComponent);
    }
  }
}
