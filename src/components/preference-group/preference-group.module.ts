import { NgModule } from '@angular/core';
import { PreferenceGroupComponent } from './preference-group.component';
import { CommonModule } from '@angular/common';
import { SwitchModule } from '../switch/switch.module';
import { PreferenceItemModule } from '../preference-item/preference-item.module';

@NgModule({
  declarations: [
    PreferenceGroupComponent,
  ],
  imports: [
    CommonModule,
    SwitchModule,
    PreferenceItemModule,
  ],
  exports: [
    PreferenceGroupComponent,
  ],
})
export class PreferenceGroupModule {
}
