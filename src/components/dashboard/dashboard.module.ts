import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { PreferenceGroupModule } from '../preference-group/preference-group.module';
import { CardModule } from '../card/card.module';
import { PreferenceItemModule } from '../preference-item/preference-item.module';
import { PreferenceModule } from '../../services/preference/preference.module';
import { CommonModule } from '@angular/common';
import { DataModule } from '../../services/data/data.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    DataModule,
    PreferenceModule,
    PreferenceGroupModule,
    PreferenceItemModule,
    CardModule,
    CommonModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
