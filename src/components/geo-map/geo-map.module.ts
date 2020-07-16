import { NgModule } from '@angular/core';
import { GeoMapComponent } from './geo-map.component';
import { DataModule } from '../../services/data/data.module';
import { CommonModule } from '@angular/common';
import { A11yPlaceholderModule } from '../../directives/a11y-placeholder/a11y-placeholder.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    GeoMapComponent,
  ],
  imports: [
    DataModule,
    CommonModule,
    A11yPlaceholderModule,
    MatCardModule,
  ],
  exports: [
    GeoMapComponent,
  ],
})
export class GeoMapModule {
}
