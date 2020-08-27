import { NgModule } from '@angular/core';
import { SummarizationControlService } from './summarization-control.service';
import { TrendRegressionSummarizationService } from './trend-regression.summarization.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
@NgModule({
  providers: [
    SummarizationControlService,
    TrendRegressionSummarizationService,
    WeekdayWeekendRelativeSummarizationService,
  ],
})
export class SummarizationModule {
}
