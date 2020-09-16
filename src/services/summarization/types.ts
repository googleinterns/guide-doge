// import { XYPoint } from '../metas/types';
import { BaseConfig } from './summarization.service';
import { WeekdayWeekendRelativeConfig } from './weekday-weekend-relative.summarization.service';
import { TrendRegressionConfig } from './trend-regression.summarization.service';
import { TrendPartialConfig } from './trend-partial.summarization.service';
import { TrendWeeklyComparisonAverageConfig } from './trend-weekly-comparison-average.summarization.service';
import { TrendWeeklyComparisonRateConfig } from './trend-weekly-comparison-rate.summarization.service';
import { TrendWeeklyElaborationConfig } from './trend-weekly-elaboration.summarization.service';
import { TrendWeeklyPatternConfig } from './trend-weekly-pattern.summarization.service';


export interface SummaryGroup {
  title: string;
  summaries: Summary[];
}

/**
 * Pair type for representing an option of a summary variable.
 * The first element is the text in string of the summary variable option, and the second element
 * is the membership function.
 */
export type SummaryVariableOptionPair<T> = [string, T];

export interface Summary {
  text: string;
  validity: number;
}

export type QuerySummariesFactory<PointT> = (points: PointT[]) => () => SummaryGroup[];

export type SummarizationConfig = WeekdayWeekendRelativeConfig | TrendRegressionConfig
  | TrendPartialConfig | TrendWeeklyComparisonAverageConfig
  | TrendWeeklyComparisonRateConfig | TrendWeeklyElaborationConfig
  | TrendWeeklyPatternConfig;

export enum SUMMARIZATION {
  WEEKDAY_WEEKEND_RELATIVE,
  TREND_REGRESSION,
  TREND_PARTIAL,
  TREND_WEEKLY_COMPARISON_AVERAGE,
  TREND_WEEKLY_COMPARISON_RATE,
  TREND_WEEKLY_ELABORATION,
  TREND_WEEKLY_PATTERN,
}

export interface SummarizationMeta {
  summarization: SUMMARIZATION;
  config: BaseConfig & Partial<SummarizationConfig>;
}
