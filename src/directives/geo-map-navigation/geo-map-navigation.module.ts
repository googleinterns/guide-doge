import { NgModule } from '@angular/core';
import { GeoMapNavigationDirective } from './geo-map-navigation.directive';
import { PreferenceModule } from '../../services/preference/preference.module';

@NgModule({
  declarations: [
    GeoMapNavigationDirective,
  ],
  imports: [
    PreferenceModule,
  ],
  exports: [
    GeoMapNavigationDirective,
  ],
})
export class GeoMapNavigationModule {
}
