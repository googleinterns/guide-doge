// import { XYPoint } from '../metas/types';
import { BaseConfig } from './summarization.service';
import { WeekdayWeekendRelativeConfig } from './weekday-weekend-relative.summarization.service';

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

export type SummarizationConfig = WeekdayWeekendRelativeConfig;
// export type SummarizationTemplate = TrendRegressionTemplate | WeekdayWeekendRelativeTemplate;

export enum SUMMARIZATION {
  WEEKDAY_WEEKEND_RELATIVE,
  TREND_REGRESSION,
}

export interface SummarizationMeta {
  summarization: SUMMARIZATION;
  config: BaseConfig & Partial<SummarizationConfig>;
}
