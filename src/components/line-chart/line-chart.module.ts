import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { LineChartVisualizationModule } from '../../components/line-chart-visualization/line-chart-visualization.module';
import { LineChartAudificationModule } from '../../components/line-chart-audification/line-chart-audification.module';

@NgModule({
  declarations: [
    LineChartComponent,
  ],
  imports: [
    LineChartVisualizationModule,
    LineChartAudificationModule,
  ],
  exports: [
    LineChartComponent,
  ],
})
export class LineChartModule {
}
