import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { DataModule } from '../../services/data/data.module';
import { CommonModule } from '@angular/common';
import { A11yPlaceholderModule } from '../../directives/a11y-placeholder/a11y-placeholder.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    LineChartComponent,
  ],
  imports: [
    DataModule,
    CommonModule,
    A11yPlaceholderModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [
    LineChartComponent,
  ],
})
export class LineChartModule {
}
