import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { LineChartModule } from '../line-chart/line-chart.module';
import { SummarizationModule } from '../../directives/summarization/summarization.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GeoMapModule } from '../geo-map/geo-map.module';
import { AudificationModule } from '../../directives/audification/audification.module';
import { GeoMapNavigationModule } from '../../directives/geo-map-navigation/geo-map-navigation.module';

@NgModule({
  declarations: [
    CardComponent,
  ],
  imports: [
    LineChartModule,
    GeoMapModule,
    AudificationModule,
    SummarizationModule,
    CommonModule,
    MatCardModule,
    GeoMapNavigationModule,
  ],
  exports: [
    CardComponent,
  ],
})
export class CardModule {
}
