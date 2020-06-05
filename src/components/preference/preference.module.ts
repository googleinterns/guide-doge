import { NgModule } from '@angular/core';
import { PreferenceComponent } from './preference.component';
import { CommonModule } from '@angular/common';
import { SwitchModule } from '../switch/switch.module';

@NgModule({
  declarations: [
    PreferenceComponent,
  ],
  imports: [
    CommonModule,
    SwitchModule,
  ],
  exports: [
    PreferenceComponent,
  ],
})
export class PreferenceModule {
}
