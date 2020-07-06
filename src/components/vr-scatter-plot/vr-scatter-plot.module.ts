import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VRScatterPlotComponent } from './vr-scatter-plot.component';



@NgModule({
  declarations: [
    VRScatterPlotComponent,
  ],
  imports: [
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
