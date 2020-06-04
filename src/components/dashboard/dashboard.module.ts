import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { LineChartModule } from '../line-chart/line-chart.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    LineChartModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
