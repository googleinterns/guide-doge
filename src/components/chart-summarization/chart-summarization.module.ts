import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartSummarizationComponent } from './chart-summarization.component';
import { LazyA11yModule } from '../../directives/a11y/a11y.directive';
import { PreferenceService } from '../../services/preference/preference.service';

@NgModule({
  declarations: [
    ChartSummarizationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ChartSummarizationComponent,
  ],
})
export class ChartSummarizationModule implements LazyA11yModule<ChartSummarizationComponent> {
  A11yComponent = ChartSummarizationComponent;
  preferenceKey: keyof PreferenceService = 'summarization$';
}
