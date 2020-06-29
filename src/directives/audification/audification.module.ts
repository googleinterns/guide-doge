import { NgModule } from '@angular/core';
import { AudificationDirective } from './audification.directive';
import { PreferenceModule } from '../../services/preference/preference.module';

@NgModule({
  declarations: [
    AudificationDirective,
  ],
  imports: [
    PreferenceModule,
  ],
  exports: [
    AudificationDirective,
  ],
})
export class AudificationModule {
}
