import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { LineChartVisualizationModule } from '../line-chart-visualization/line-chart-visualization.module';
import { CardModule } from '../card/card.module';
import { CommonModule } from '@angular/common';
import { A11yHostModule } from '../../directives/a11y-host/a11y-host.module';
import { CardFoldModule } from '../card-fold/card-fold.module';

@NgModule({
  declarations: [
    LineChartComponent,
  ],
  imports: [
    CardModule,
    LineChartVisualizationModule,
    A11yHostModule,
    CardFoldModule,
    CommonModule,
  ],
  exports: [
    LineChartComponent,
  ],
})
export class LineChartModule {
}
