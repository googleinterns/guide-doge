import { NgModule } from '@angular/core';
import { LineChartVisualizationComponent } from './line-chart-visualization.component';
import { DataModule } from '../../services/data/data.module';

@NgModule({
  declarations: [
    LineChartVisualizationComponent,
  ],
  imports: [
    DataModule,
  ],
  exports: [
    LineChartVisualizationComponent,
  ],
})
export class LineChartVisualizationModule {
}
