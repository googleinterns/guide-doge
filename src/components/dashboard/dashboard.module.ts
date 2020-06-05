import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { LineChartModule } from '../line-chart/line-chart.module';
import { PreferenceModule } from '../preference/preference.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    LineChartModule,
    PreferenceModule,
    FormsModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
