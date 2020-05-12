import { Category, Row, Filter } from "./types";

const millisecondsPerDay = 86400000;

export function betweenDates(startDate: Date, endDate: Date): Filter {
    return (categories: Category[]) => {
        const nThDayIndex = categories.findIndex((category) => category.name == 'nthDay' );
        const startIndex = Math.round((Date.now() - startDate.getTime())/ millisecondsPerDay);
        const endIndex = Math.round((Date.now() - endDate.getTime())/ millisecondsPerDay);
        return (row: Row) => 
            row.header[nThDayIndex] <= startIndex && row.header[nThDayIndex] >= endIndex;

    };
}