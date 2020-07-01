import { Category, Filter, RangeOptions, Row } from './types';

export function betweenDates(startDate: Date, endDate: Date, rangeOptions?: RangeOptions): Filter {
  const dateRange: [Date, Date] = [startDate, endDate];
  return inOneOfDateRanges([dateRange], rangeOptions);
}

export function inOneOfDateRanges(dateRanges: [Date, Date][], rangeOptions: RangeOptions = {}): Filter {
  const {
    excludeStart = false,
    excludeEnd = false,
  } = rangeOptions;
  const startOffset = excludeStart ? 1 : 0;
  const endOffset = excludeEnd ? -1 : 0;
  return (categories: Category[]) => {
    const dateIndex = categories.findIndex(
      category => category.name === 'date',
    );
    return (row: Row) =>
      dateRanges.some(([startDate, endDate]) => {
        const time = row.header[dateIndex];
        const start = startDate.getTime() + startOffset;
        const end = endDate.getTime() + endOffset;
        return start <= time && time <= end;
      });
  };
}
