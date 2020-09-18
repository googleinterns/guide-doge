import * as random from 'random';
import { TimeSeriesPoint } from './metas/types';
import { DAY } from '../utils/timeUnits';
import { Dataset } from './types';
import { PreferenceMeta } from '../services/preference/types';
import { TimeSeriesQueryOptions } from './queries/time-series.query';
import { createLineChartMeta } from './metas/line-chart.meta';
import { SUMMARIZATION } from '../services/summarization/types';

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

  const activeUsersSummarizationMetas = [
    SUMMARIZATION.TREND_REGRESSION,
    SUMMARIZATION.WEEKDAY_WEEKEND_RELATIVE,
    SUMMARIZATION.TREND_WEEKLY_PATTERN,
    SUMMARIZATION.TREND_WEEKLY_COMPARISON_AVERAGE,
    SUMMARIZATION.TREND_WEEKLY_COMPARISON_RATE,
    SUMMARIZATION.TREND_WEEKLY_ELABORATION,
    SUMMARIZATION.TREND_PARTIAL,
  ].map(summarization => ({
    summarization,
    config: {
      datumLabels: ['Last 28 days'],
      metric: 'active users',
      metricUnit: 'users',
    },
  }));

  const activeUsersLineChartMeta = createLineChartMeta(
    'Active Users',
    (options: TimeSeriesQueryOptions) => [{
      label: 'Last 28 days',
      points: activeUsersPoints,
    }],
    activeUsersSummarizationMetas,
  );

  const metas = [
    activeUsersLineChartMeta,
  ];

  return {
    metas,
  };
}
