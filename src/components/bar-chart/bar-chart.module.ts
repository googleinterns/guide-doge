import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart.component';
import { CommonModule } from '@angular/common';
import { A11yPlaceholderModule } from '../../directives/a11y-placeholder/a11y-placeholder.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    BarChartComponent,
  ],
  imports: [
    CommonModule,
    A11yPlaceholderModule,
    MatCardModule,
  ],
  exports: [
    BarChartComponent,
  ],
})
export class BarChartModule {
}
