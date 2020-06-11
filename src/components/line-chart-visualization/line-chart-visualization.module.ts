import { NgModule } from '@angular/core';
import { LineChartVisualizationComponent } from './line-chart-visualization.component';
import { DataModule } from '../../services/data/data.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LineChartVisualizationComponent,
  ],
  imports: [
    DataModule,
    CommonModule,
  ],
  exports: [
    LineChartVisualizationComponent,
  ],
})
export class LineChartVisualizationModule {
}
