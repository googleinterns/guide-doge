import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { LineChartModule } from '../line-chart/line-chart.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GeoMapModule } from '../geo-map/geo-map.module';
import { A11yModule } from '../../directives/a11y/a11y.module';

@NgModule({
  declarations: [
    CardComponent,
  ],
  imports: [
    LineChartModule,
    GeoMapModule,
    A11yModule,
    CommonModule,
    MatCardModule,
  ],
  exports: [
    CardComponent,
  ],
})
export class CardModule {
}
