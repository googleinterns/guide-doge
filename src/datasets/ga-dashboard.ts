import * as random from 'random';
import { TimeSeriesPoint } from './metas/types';
import { DAY } from '../utils/timeUnits';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { createBarChartMeta, createPieChartMeta } from './metas/categorical.meta';
import { TimeSeriesQueryOptions } from './queries/time-series.query';
import { CategoricalQueryOptions } from './queries/categorical.query';
import { combineQuerySummariesFactories } from './summarizations/utils/commons';
import * as CategoryTopKSummarization from './summarizations/category-topk.summarization';
import * as CategoryTopKCoverageSummarization from './summarizations/category-topk-coverage.summarization';
import * as CategoryBucketComparisonSummarization from './summarizations/category-bucket-comparison.summarization';
import * as TrendPartialSummarization from './summarizations/trend-partial.summarization';
import * as TrendRegressionSummarization from './summarizations/trend-regression.summarization';
import * as TrendWeeklyComparisonAverageSummarization from './summarizations/trend-weekly-comparison-average.summarization';
import * as TrendWeeklyComparisonRateSummarization from './summarizations/trend-weekly-comparison-rate.summarization';
import * as TrendWeeklyPatternSummarization from './summarizations/trend-weekly-pattern.summarization';
import * as TrendWeeklyElaborationSummarization from './summarizations/trend-weekly-elaboration.summarization';
import * as WorkdayHolidayRelativeSummarization from './summarizations/workday-holiday-relative.summarization';
import { createLineChartMeta } from './metas/line-chart.meta';

export type Config = {};

export const configMeta: PreferenceMeta<Config> = {};

export function create(config: Config): Dataset {
  const sessionsByCountriesPoints = [
    { x: 'US', y: 4820 },
    { x: 'India', y: 2330 },
    { x: 'Canada', y: 790 },
    { x: 'UK', y: 340 },
    { x: 'Japan', y: 270 },
  ];
  const sessionsByDevicesPoints = [
    { x: 'Desktop', y: 6860 },
    { x: 'Mobile', y: 2990 },
    { x: 'Tablet', y: 730 },
    { x: 'Others', y: 150 },
  ];


  const activeUsersPointsLength = 28;
  const activeUsersPoints: TimeSeriesPoint[] = [];

  const activeUsersWeekPattern = [10, 60, 80, 100, 80, 40, 0];
  const activeUsersOffset = 200;
  const activeUsersGrowingRate = 10;

  const startDate = new Date(Date.now() - activeUsersPointsLength * DAY);
  const rand = random.normal(0, 10);

  for (let i = 1; i <= activeUsersPointsLength; i++) {
    const x = new Date(startDate.getTime() + i * DAY);
    const y = activeUsersOffset + i * activeUsersGrowingRate + activeUsersWeekPattern[x.getDay()] + rand();
    activeUsersPoints.push({ x, y });
  }

  const categoricalChartQuerySummariesFactory = combineQuerySummariesFactories(
    CategoryTopKSummarization.queryFactory,
    CategoryTopKCoverageSummarization.queryFactory,
    CategoryBucketComparisonSummarization.queryFactory,
  );

  const lineChartQuerySummariesFactory = combineQuerySummariesFactories(
    TrendRegressionSummarization.queryFactory,
    WorkdayHolidayRelativeSummarization.queryFactory,
    TrendWeeklyPatternSummarization.queryFactory,
    TrendWeeklyComparisonAverageSummarization.queryFactory,
    TrendWeeklyComparisonRateSummarization.queryFactory,
    TrendWeeklyElaborationSummarization.queryFactory,
    TrendPartialSummarization.queryFactory,
  );

  const sessionsByCountriesBarChartMeta = createBarChartMeta(
    'Sessions By Country',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByCountriesPoints,
      querySummaries: categoricalChartQuerySummariesFactory(sessionsByCountriesPoints),
    }],
  );

  const sessionsByDevicesPieChartMeta = createPieChartMeta(
    'Sessions By Device',
    (options: CategoricalQueryOptions) => [{
      label: 'Country Sessions',
      points: sessionsByDevicesPoints,
      querySummaries: categoricalChartQuerySummariesFactory(sessionsByDevicesPoints),
    }],
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
    sessionsByCountriesBarChartMeta,
    sessionsByDevicesPieChartMeta,
    activeUsersLineChartMeta,
  ];

  return {
    metas,
  };
}
