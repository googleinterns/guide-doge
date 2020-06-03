import { NgModule } from '@angular/core';
import { LineChartAudificationComponent } from './line-chart-audification.component';
import { AudificationModule } from '../../services/audification/audification.module';

@NgModule({
  declarations: [
    LineChartAudificationComponent,
  ],
  imports: [
    AudificationModule,
  ],
  exports: [
    LineChartAudificationComponent,
  ],
})
export class LineChartAudificationModule {
}
