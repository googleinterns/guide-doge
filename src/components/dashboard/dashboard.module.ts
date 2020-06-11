import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { LineChartModule } from '../line-chart/line-chart.module';
import { PreferenceModule } from '../preference/preference.module';
import { FormsModule } from '@angular/forms';
import { SwitchModule } from '../switch/switch.module';
import { AudificationModule } from '../../directives/audification/audification.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    LineChartModule,
    PreferenceModule,
    FormsModule,
    SwitchModule,
    AudificationModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
