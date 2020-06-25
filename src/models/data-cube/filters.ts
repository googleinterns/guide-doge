import { Category, Filter, Row } from './types';

export function betweenDates(startDate: Date, endDate: Date): Filter {
  return (categories: Category[]) => {
    const dateIndex = categories.findIndex(
      category => category.name === 'date',
    );
    return (row: Row) =>
      startDate.getTime() <= row.header[dateIndex] &&
      row.header[dateIndex] <= endDate.getTime();
  };
}
