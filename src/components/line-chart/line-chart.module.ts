import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { LineChartVisualizationModule } from '../line-chart-visualization/line-chart-visualization.module';
import { CardModule } from '../card/card.module';
import { CommonModule } from '@angular/common';
import { A11yHostModule } from '../../directives/a11y-host/a11y-host.module';
import { FoldModule } from '../fold/fold.module';

@NgModule({
  declarations: [
    LineChartComponent,
  ],
  imports: [
    CardModule,
    LineChartVisualizationModule,
    A11yHostModule,
    FoldModule,
    CommonModule,
  ],
  exports: [
    LineChartComponent,
  ],
})
export class LineChartModule {
}
