import { NgModule } from '@angular/core';
import { GeoMapNavigationComponent } from './geo-map-navigation.component';
import { CommonModule } from '@angular/common';
import { ScreenReaderModule } from '../screen-reader/screen-reader.module';
import { LazyA11yModule } from '../../directives/a11y-placeholder/types';

@NgModule({
  declarations: [
    GeoMapNavigationComponent,
  ],
  imports: [
    CommonModule,
    ScreenReaderModule,
  ],
  exports: [
    GeoMapNavigationComponent,
  ],
})
export class GeoMapNavigationModule implements LazyA11yModule<GeoMapNavigationComponent> {
  A11yComponent = GeoMapNavigationComponent;
}
