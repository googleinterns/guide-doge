import { Category, Filter, FilterOptions, Row } from './types';

const millisecondsPerDay = 24 * 60 * 60 * 1000;

const defaultOptions: FilterOptions = {
  excludeStartDate: false,
  excludeEndDate: false,
};

export function betweenDates(startDate: Date, endDate: Date, options: Partial<FilterOptions> = {}): Filter {
  const { excludeStartDate, excludeEndDate } = {
    ...defaultOptions,
    ...options,
  };
  return (categories: Category[]) => {
    const nThDayIndex = categories.findIndex(
      category => category.name === 'nthDay',
    );
    let startIndex = Math.round(
      (Date.now() - startDate.getTime()) / millisecondsPerDay,
    );
    if (excludeStartDate) {
      startIndex--;
    }
    let endIndex = Math.round(
      (Date.now() - endDate.getTime()) / millisecondsPerDay,
    );
    if (excludeEndDate) {
      endIndex++;
    }
    return (row: Row) =>
      row.header[nThDayIndex] <= startIndex &&
      row.header[nThDayIndex] >= endIndex;
  };
}
