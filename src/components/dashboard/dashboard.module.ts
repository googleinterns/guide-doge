import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { PreferenceGroupModule } from '../preference-group/preference-group.module';
import { FormsModule } from '@angular/forms';
import { CardModule } from '../card/card.module';
import { PreferenceItemModule } from '../preference-item/preference-item.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    PreferenceGroupModule,
    PreferenceItemModule,
    FormsModule,
    CardModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
