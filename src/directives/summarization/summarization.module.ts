import { NgModule } from '@angular/core';
import { SummarizationDirective } from './summarization.directive';
import { PreferenceModule } from '../../services/preference/preference.module';

@NgModule({
  declarations: [
    SummarizationDirective,
  ],
  imports: [
    PreferenceModule,
  ],
  exports: [
    SummarizationDirective,
  ],
})
export class SummarizationModule {
}
