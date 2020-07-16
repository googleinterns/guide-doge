import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { LineChartModule } from '../line-chart/line-chart.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GeoMapModule } from '../geo-map/geo-map.module';

@NgModule({
  declarations: [
    CardComponent,
  ],
  imports: [
    LineChartModule,
    GeoMapModule,
    CommonModule,
    MatCardModule,
  ],
  exports: [
    CardComponent,
  ],
})
export class CardModule {
}
