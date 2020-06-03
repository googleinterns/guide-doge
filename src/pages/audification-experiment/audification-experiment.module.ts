import { NgModule } from '@angular/core';
import { AudificationExperimentComponent } from './audification-experiment.component';
import { LineChartModule } from '../../components/line-chart/line-chart.module';

@NgModule({
  declarations: [
    AudificationExperimentComponent,
  ],
  imports: [
    LineChartModule,
  ],
  exports: [
    AudificationExperimentComponent,
  ],
})
export class AudificationExperimentModule {
}
