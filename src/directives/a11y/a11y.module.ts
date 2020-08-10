import { NgModule } from '@angular/core';
import { A11yDirective } from './a11y.directive';
import { PreferenceModule } from '../../services/preference/preference.module';

@NgModule({
  declarations: [
    A11yDirective,
  ],
  imports: [
    PreferenceModule,
  ],
  exports: [
    A11yDirective,
  ],
})
export class A11yModule {
}
