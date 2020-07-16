import { NgModule } from '@angular/core';
import { GeoMapComponent } from './geo-map.component';
import { A11yPlaceholderModule } from '../../directives/a11y-placeholder/a11y-placeholder.module';

@NgModule({
  declarations: [
    GeoMapComponent,
  ],
  imports: [
    A11yPlaceholderModule,
  ],
  exports: [
    GeoMapComponent,
  ],
})
export class GeoMapModule {
}
