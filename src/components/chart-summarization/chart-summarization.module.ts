import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChartSummarizationComponent } from './chart-summarization.component';
import { SummaryValidityChipComponent } from './summary-validity-chip/summary-validity-chip.component';
import { LazyA11yModule } from '../../directives/a11y/a11y.directive';
import { SummarizationModule } from '../../services/summarization/summarization.module';

@NgModule({
  declarations: [
    ChartSummarizationComponent,
    SummaryValidityChipComponent,
  ],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    SummarizationModule,
  ],
  exports: [
    SummaryValidityChipComponent,
    ChartSummarizationComponent,
  ],
})
export class ChartSummarizationModule implements LazyA11yModule<ChartSummarizationComponent> {
  A11yComponent = ChartSummarizationComponent;
}
