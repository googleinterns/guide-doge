import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { DataModule } from '../../services/data/data.module';
import { CommonModule } from '@angular/common';
import { A11yHostModule } from '../../directives/a11y-host/a11y-host.module';

@NgModule({
  declarations: [
    LineChartComponent,
  ],
  imports: [
    DataModule,
    CommonModule,
    A11yHostModule,
  ],
  exports: [
    LineChartComponent,
  ],
})
export class LineChartModule {
}
