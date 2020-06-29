import { QueryOptions } from '../../models/data-cube/types';

export interface TimeSeriesQueryOptions extends QueryOptions {
  startDate: Date;
  endDate: Date;
}

export const COMPOUND_MEASURE_DELIMITER = '$$';

export enum CompoundMeasureType {
  ROLLING,
  PERIOD_OVER_PERIOD,
}

export interface CompoundMeasure {
  originalMeasureName: string;
  type: CompoundMeasureType;
}

export interface RollingMeasure extends CompoundMeasure {
  type: CompoundMeasureType.ROLLING;
  windowSize: number;
}

export interface PeriodOverPeriodMeasure extends CompoundMeasure {
  type: CompoundMeasureType.PERIOD_OVER_PERIOD;
  periodOffset: number;
}
