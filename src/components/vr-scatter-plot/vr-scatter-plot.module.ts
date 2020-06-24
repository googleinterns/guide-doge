import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VRScatterPlotComponent } from './vr-scatter-plot.component';
import { PreferenceModule } from '../preference/preference.module';
import { FormsModule } from '@angular/forms';
import { SwitchModule } from '../switch/switch.module';
import { CardModule } from '../card/card.module';


@NgModule({
  declarations: [
    VRScatterPlotComponent,
  ],
  imports: [
    PreferenceModule,
    FormsModule,
    SwitchModule,
    CardModule,
  ],
  exports: [
    VRScatterPlotComponent,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VRScatterPlotModule {
}
