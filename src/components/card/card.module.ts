import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { LineChartModule } from '../line-chart/line-chart.module';
import { AudificationModule } from '../../directives/audification/audification.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    CardComponent,
  ],
  imports: [
    LineChartModule,
    AudificationModule,
    CommonModule,
    MatCardModule,
  ],
  exports: [
    CardComponent,
  ],
})
export class CardModule {
}
