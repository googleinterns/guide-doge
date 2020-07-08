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

export const COMPOUND_MEASURE_DELIMITER = '$$';

export function isCompoundMeasure(measureName: string) {
  return measureName.includes(COMPOUND_MEASURE_DELIMITER);
}

function nameCompoundMeasure(originalMeasureName: string, type: CompoundMeasureType, ...params: (string | number)[]) {
  return [originalMeasureName, type, ...params].join(COMPOUND_MEASURE_DELIMITER);
}

export function nameRollingMeasure(originalMeasureName: string, windowSize: number) {
  return nameCompoundMeasure(originalMeasureName, CompoundMeasureType.ROLLING, windowSize);
}

export function namePeriodOverPeriodMeasure(originalMeasureName: string, periodOffset: number) {
  return nameCompoundMeasure(originalMeasureName, CompoundMeasureType.PERIOD_OVER_PERIOD, periodOffset);
}

export function destructureCompoundMeasure(measureName: string): CompoundMeasure {
  const [originalMeasureName, type, ...params] = measureName.split(COMPOUND_MEASURE_DELIMITER);
  switch (+type) {
    case CompoundMeasureType.ROLLING:
      return { originalMeasureName, type: +type, windowSize: +params[0] } as RollingMeasure;
    case CompoundMeasureType.PERIOD_OVER_PERIOD:
      return { originalMeasureName, type: +type, periodOffset: +params[0] } as PeriodOverPeriodMeasure;
  }
  throw new Error('Unknown compound measure type.');
}
