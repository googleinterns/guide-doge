import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { PreferenceModule } from '../preference/preference.module';
import { FormsModule } from '@angular/forms';
import { SwitchModule } from '../switch/switch.module';
import { CardModule } from '../card/card.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    PreferenceModule,
    FormsModule,
    SwitchModule,
    CardModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
