import { NgModule } from '@angular/core';
import { LineChartAudificationComponent } from './line-chart-audification.component';
import { CommonModule } from '@angular/common';
import { ScreenReaderModule } from '../screen-reader/screen-reader.module';
import { PreferenceService } from '../../services/preference/preference.service';
import { LazyA11yModule } from '../../directives/a11y/a11y.directive';

@NgModule({
  declarations: [
    LineChartAudificationComponent,
  ],
  imports: [
    CommonModule,
    ScreenReaderModule,
  ],
  exports: [
    LineChartAudificationComponent,
  ],
})
export class LineChartAudificationModule implements LazyA11yModule<LineChartAudificationComponent> {
  A11yComponent = LineChartAudificationComponent;
  preferenceKey: keyof PreferenceService = 'audification$';
}
