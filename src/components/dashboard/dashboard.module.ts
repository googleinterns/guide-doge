import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { PreferenceGroupModule } from '../preference-group/preference-group.module';
import { FormsModule } from '@angular/forms';
import { CardModule } from '../card/card.module';
import { PreferenceItemModule } from '../preference-item/preference-item.module';
import { PreferencesModule } from '../../services/preferences/preferences.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    PreferencesModule,
    PreferenceGroupModule,
    PreferenceItemModule,
    FormsModule,
    CardModule,
    CommonModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
