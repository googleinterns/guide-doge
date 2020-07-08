import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartSummarizationComponent } from './summarization.component';
import { LazyA11yModule } from '../../directives/a11y-placeholder/types';

@NgModule({
  declarations: [
    ChartSummarizationComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChartSummarizationComponent,
  ],
})
export class ChartSummarizationModule implements LazyA11yModule<ChartSummarizationComponent>{
  A11yComponent = ChartSummarizationComponent;
}
