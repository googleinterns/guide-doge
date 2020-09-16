import { NgModule } from '@angular/core';
import { SummarizationControlService } from './summarization-control.service';
import { SummarizationDataSourceService } from './summarization-data-source.service';
import { TrendRegressionSummarizationService } from './trend-regression.summarization.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
@NgModule({
  providers: [
    SummarizationControlService,
    SummarizationDataSourceService,
    TrendRegressionSummarizationService,
    WeekdayWeekendRelativeSummarizationService,
  ],
})
export class SummarizationModule {
}
