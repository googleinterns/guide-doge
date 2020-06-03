import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { DataModule } from '../../services/data/data.module';
import { LineChartAudificationModule } from '../line-chart-audification/line-chart-audification.module';

@NgModule({
  declarations: [
    LineChartComponent,
  ],
  imports: [
    DataModule,
    LineChartAudificationModule,
  ],
  exports: [
    LineChartComponent,
  ],
})
export class LineChartModule {
}
