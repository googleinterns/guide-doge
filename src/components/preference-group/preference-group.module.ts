import { NgModule } from '@angular/core';
import { PreferenceGroupComponent } from './preference-group.component';
import { CommonModule } from '@angular/common';
import { SwitchModule } from '../switch/switch.module';

@NgModule({
  declarations: [
    PreferenceGroupComponent,
  ],
  imports: [
    CommonModule,
    SwitchModule,
  ],
  exports: [
    PreferenceGroupComponent,
  ],
})
export class PreferenceGroupModule {
}
