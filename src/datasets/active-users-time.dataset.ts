import * as random from 'random';
import { TimeSeriesPoint } from './metas/types';
import { DAY } from '../utils/timeUnits';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { TimeSeriesQueryOptions } from './queries/time-series.query';
import { combineQuerySummariesFactories } from './summarizations/utils/commons';
import * as TrendPartialSummarization from './summarizations/trend-partial.summarization';
import * as TrendRegressionSummarization from './summarizations/trend-regression.summarization';
import * as TrendWeeklyComparisonAverageSummarization from './summarizations/trend-weekly-comparison-average.summarization';
import * as TrendWeeklyComparisonRateSummarization from './summarizations/trend-weekly-comparison-rate.summarization';
import * as TrendWeeklyPatternSummarization from './summarizations/trend-weekly-pattern.summarization';
import * as TrendWeeklyElaborationSummarization from './summarizations/trend-weekly-elaboration.summarization';
import * as WorkdayHolidayRelativeSummarization from './summarizations/workday-holiday-relative.summarization';
import { createLineChartMeta } from './metas/line-chart.meta';
import { QuerySummariesFactory, ConfigurableQuerySummariesFactory } from './summarizations/types';
import { trueDependencies } from 'mathjs';

export type Config = {
  LinearGrowingRate: number;
  LinearOffset: number;
  NoiseLevel: number;
  MondayOffset: number;
  TuesdayOffset: number;
  WednesdayOffset: number;
  ThursdayOffset: number;
  FridayOffset: number;
  SaturdayOffset: number;
  SundayOffset: number;
};

export const configMeta: PreferenceMeta<Config> = {
  LinearGrowingRate: {
    type: 'number',
    defaultValue: 5,
  },
  LinearOffset: {
    type: 'number',
    defaultValue: 100,
  },
  NoiseLevel: {
    type: 'number',
    defaultValue: 10,
  },
  MondayOffset: {
    type: 'number',
    defaultValue: 60,
  },
  TuesdayOffset: {
    type: 'number',
    defaultValue: 70,
  },
  WednesdayOffset: {
    type: 'number',
    defaultValue: 80,
  },
  ThursdayOffset: {
    type: 'number',
    defaultValue: 90,
  },
  FridayOffset: {
    type: 'number',
    defaultValue: 100,
  },
  SaturdayOffset: {
    type: 'number',
    defaultValue: -30,
  },
  SundayOffset: {
    type: 'number',
    defaultValue: -40,
  },
};

export function create(config: Config): Dataset {
  const activeUsersPointsLength = 28;
  const activeUsersPoints: TimeSeriesPoint[] = [];

  const {
    LinearGrowingRate,
    LinearOffset,
    NoiseLevel,
    MondayOffset,
    TuesdayOffset,
    WednesdayOffset,
    ThursdayOffset,
    FridayOffset,
    SaturdayOffset,
    SundayOffset,
  } = config;
  const activeUsersWeekPattern = [
    SundayOffset,
    MondayOffset,
    TuesdayOffset,
    WednesdayOffset,
    ThursdayOffset,
    FridayOffset,
    SaturdayOffset,
  ];

  const startDate = new Date(Date.now() - activeUsersPointsLength * DAY);
  const rand = random.normal(0, NoiseLevel);

  for (let i = 1; i <= activeUsersPointsLength; i++) {
    const x = new Date(startDate.getTime() + i * DAY);
    const y = LinearOffset + i * LinearGrowingRate + activeUsersWeekPattern[x.getDay()] + rand();
    activeUsersPoints.push({ x, y });
  }

  const lineChartQuerySummariesFactory = combineQuerySummariesFactories(
    TrendRegressionSummarization.queryFactory,
    WorkdayHolidayRelativeSummarization.queryFactory,
    TrendWeeklyPatternSummarization.queryFactory,
    TrendWeeklyComparisonAverageSummarization.queryFactory,
    TrendWeeklyComparisonRateSummarization.queryFactory,
    TrendWeeklyElaborationSummarization.queryFactory,
    TrendPartialSummarization.queryFactory,
  );

  const activeUsersLineChartMeta = createLineChartMeta(
    'Active Users',
    (options: TimeSeriesQueryOptions) => [{
      label: 'Last 28 days',
      points: activeUsersPoints,
      querySummaries: lineChartQuerySummariesFactory(activeUsersPoints),
    }],
  );

  const metas = [
    activeUsersLineChartMeta,
  ];

  return {
    metas,
  };
}

function bindQueryFactoryConfig<P, C>(
  queryFactory: ConfigurableQuerySummariesFactory<P, C>, config: Partial<C>) {
  return (points) => queryFactory(points, config);
}
