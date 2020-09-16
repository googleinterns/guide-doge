import { NgModule } from '@angular/core';
import { SummarizationControlService } from './summarization-control.service';
import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TrendRegressionSummarizationService } from './trend-regression.summarization.service';
import { TrendPartialSummarizationService } from './trend-partial.summarization.service';
import { TrendWeeklyComparisonAverageSummarizationService } from './trend-weekly-comparison-average.summarization.service';
import { TrendWeeklyComparisonRateSummarizationService } from './trend-weekly-comparison-rate.summarization.service';
import { TrendWeeklyElaborationSummarizationService } from './trend-weekly-elaboration.summarization.service';
import { TrendWeeklyPatternSummarizationService } from './trend-weekly-pattern.summarization.service';

@NgModule({
  providers: [
    SummarizationControlService,
    SummarizationDataSourceService,
    WeekdayWeekendRelativeSummarizationService,
    TrendRegressionSummarizationService,
    TrendPartialSummarizationService,
    TrendWeeklyComparisonAverageSummarizationService,
    TrendWeeklyComparisonRateSummarizationService,
    TrendWeeklyElaborationSummarizationService,
    TrendWeeklyPatternSummarizationService,
  ],
})
export class SummarizationModule {
}
