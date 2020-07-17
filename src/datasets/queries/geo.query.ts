import { XYPoint } from '../metas/types';
import { inOneOfDateRanges } from '../../models/data-cube/filters';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { unique } from '../../utils/misc';

export interface GeoQueryOptions {
  range: [Date, Date];
}

export type TimeSeriesPoint = XYPoint<Date, number>;

export interface TimeSeriesDatum<S> {
  label: string;
  style?: Partial<S>;
  points: TimeSeriesPoint[];
}

export type TimeSeriesQuery<S> = (options: TimeSeriesQueryOptions) => TimeSeriesDatum<S>[];

export function createGeoQuery<S>(dataCube: DataCube, legendItems: LegendItem<S>[]): TimeSeriesQuery<S> {
  return queryOptions => {
    const [startDate, endDate] = queryOptions.range;
    const measureNames = unique(legendItems.map(item => item.measureName));

    const windowSizes = legendItems
      .map(item => item.windowSize)
      .filter(((v): v is number => v !== undefined));
    const periodOffsets = legendItems
      .map(item => item.periodOffset)
      .filter(((v): v is number => v !== undefined));

    const dateCategoryName = 'date';
    const duration = endDate.getTime() - startDate.getTime();
    const maxWindowSize = Math.max(0, ...windowSizes);
    const dateRanges: [Date, Date][] = [0, ...periodOffsets].map(periodOffset => {
      const periodStart = startDate.getTime() + periodOffset;
      const rangeStartDate = new Date(periodStart - maxWindowSize);
      const rangeEndDate = new Date(periodStart + duration);
      return [rangeStartDate, rangeEndDate];
    });
    const dateFilter = inOneOfDateRanges(dateRanges, { excludeStart: true });

    const rows = dataCube.getDataFor({
      categoryNames: [dateCategoryName],
      measureNames,
      filters: [dateFilter],
      sortBy: [dateCategoryName],
    });

    return legendItems.map(item => createTimeSeriesDatum(rows, startDate, endDate, item));
  };
}
