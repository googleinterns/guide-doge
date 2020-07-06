import { NgModule } from '@angular/core';
import { LineChartAudificationComponent } from './line-chart-audification.component';
import { CommonModule } from '@angular/common';
import { ScreenReaderModule } from '../screen-reader/screen-reader.module';
import { LazyA11yModule } from '../../directives/a11y-placeholder/types';

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
}
