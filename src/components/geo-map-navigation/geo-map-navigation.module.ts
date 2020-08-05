import { NgModule } from '@angular/core';
import { GeoMapNavigationComponent } from './geo-map-navigation.component';
import { CommonModule } from '@angular/common';
import { ScreenReaderModule } from '../screen-reader/screen-reader.module';
import { PreferenceService } from '../../services/preference/preference.service';
import { LazyA11yModule } from '../../directives/a11y/a11y.directive';

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
  preferenceKey: keyof PreferenceService = 'geoMapNavigation$';
}
