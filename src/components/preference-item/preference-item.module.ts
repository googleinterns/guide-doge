import { NgModule } from '@angular/core';
import { PreferenceItemComponent } from './preference-item.component';
import { CommonModule } from '@angular/common';
import { SwitchModule } from '../switch/switch.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PreferenceItemComponent,
  ],
  imports: [
    CommonModule,
    SwitchModule,
    FormsModule,
  ],
  exports: [
    PreferenceItemComponent,
  ],
})
export class PreferenceItemModule {
}
