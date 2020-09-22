import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VRAccessibilityComponent } from './vr-accessibility.component';
import { PreferenceModule } from '../../services/preference/preference.module';
import { DataModule } from '../../services/data/data.module';
import { PreferenceGroupModule } from '../preference-group/preference-group.module';
import { FormsModule } from '@angular/forms';
import { CardModule } from '../card/card.module';
import { PreferenceItemModule } from '../preference-item/preference-item.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    VRAccessibilityComponent,
  ],
  imports: [
    PreferenceModule,
    DataModule,
    PreferenceModule,
    PreferenceGroupModule,
    PreferenceItemModule,
    FormsModule,
    CardModule,
    CommonModule
  ],
  exports: [
    VRAccessibilityComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VRAccessibilityModule {
}
