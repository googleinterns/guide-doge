import { NgModule } from '@angular/core';
import { PreferenceItemComponent } from './preference-item.component';
import { CommonModule } from '@angular/common';
import { SwitchModule } from '../switch/switch.module';

@NgModule({
  declarations: [
    PreferenceItemComponent,
  ],
  imports: [
    CommonModule,
    SwitchModule,
  ],
  exports: [
    PreferenceItemComponent,
  ],
})
export class PreferenceItemModule {
}
