import { TrendRegressionProperties, TrendRegressionConfig, TrendRegressionTemplate } from './trend-regression.summarization.service';
import { WeekdayWeekendRelativeProperties, WeekdayWeekendRelativeConfig, WeekdayWeekendRelativeTemplate } from './weekday-weekend-relative.summarization.service';

export interface Summary {
  text: string;
  validity: number;
}

export interface SummaryGroup {
  name: string;
  summaries: Summary[];
}

export type SummarizationConfig = TrendRegressionConfig & WeekdayWeekendRelativeConfig;
export type SummarizationTemplate = TrendRegressionTemplate | WeekdayWeekendRelativeTemplate;

export interface SummarizationMeta {
  datumLabel: string;
  summarizationName: string;
  config?: Partial<SummarizationConfig>;
  template?: Partial<SummarizationTemplate>;
}

