import { Datum } from './types';

export function xBetweenDates<T>(startDate: Date, endDate: Date) {
  return (d: Datum<Date, T>) => startDate < d.x && d.x <= endDate;
}
