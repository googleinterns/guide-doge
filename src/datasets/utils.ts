import { XYPoint } from './types';

export function xBetweenDates<T>(startDate: Date, endDate: Date) {
  return (d: XYPoint<Date, T>) => startDate < d.x && d.x <= endDate;
}
