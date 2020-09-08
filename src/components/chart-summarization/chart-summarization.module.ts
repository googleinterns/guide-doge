import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChartSummarizationComponent } from './chart-summarization.component';
import { LazyA11yModule } from '../../directives/a11y/a11y.directive';

@NgModule({
  declarations: [
    ChartSummarizationComponent,
  ],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    ChartSummarizationComponent,
  ],
})
export class ChartSummarizationModule implements LazyA11yModule<ChartSummarizationComponent> {
  A11yComponent = ChartSummarizationComponent;
}
