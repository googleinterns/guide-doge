import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { DataModule } from '../../services/data/data.module';

@NgModule({
  declarations: [
    LineChartComponent,
  ],
  imports: [
    DataModule,
  ],
  exports: [
    LineChartComponent,
  ]
})
export class LineChartModule {
}
