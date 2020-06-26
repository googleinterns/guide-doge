import { QueryOptions } from '../../models/data-cube/types';

export interface TimeSeriesQueryOptions extends QueryOptions {
  startDate: Date;
  endDate: Date;
}

export interface TimeSeriesWithComparisonQueryOptions extends TimeSeriesQueryOptions {
  rollingUnits?: number[];
  periodOverPeriodOffsets?: number[];
}
