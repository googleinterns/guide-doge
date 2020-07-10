import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VRScatterPlotComponent } from './vr-scatter-plot.component';
import { PreferenceModule } from '../../services/preference/preference.module';
import { DataModule } from '../../services/data/data.module';



@NgModule({
  declarations: [
    VRScatterPlotComponent,
  ],
  imports: [
    PreferenceModule,
    DataModule
  ],
  exports: [
    VRScatterPlotComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VRScatterPlotModule {
}
