import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { PreferenceModule } from '../preference/preference.module';

@NgModule({
  providers: [
    DataService,
  ],
  imports: [
    PreferenceModule,
  ]
})
export class DataModule {
}
