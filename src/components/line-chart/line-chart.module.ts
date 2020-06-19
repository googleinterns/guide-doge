import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { DataModule } from '../../services/data/data.module';
import { CommonModule } from '@angular/common';
import { A11yPlaceholderModule } from '../../directives/a11y-placeholder/a11y-placeholder.module';

@NgModule({
  declarations: [
    LineChartComponent,
  ],
  imports: [
    DataModule,
    CommonModule,
    A11yPlaceholderModule,
  ],
  exports: [
    LineChartComponent,
  ],
})
export class LineChartModule {
}
