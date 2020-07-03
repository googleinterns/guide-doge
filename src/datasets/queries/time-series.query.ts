import { XYPoint } from '../types';
import { inOneOfDateRanges } from '../../models/data-cube/filters';
import { DAY } from '../../utils/timeUnits';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { ResultRow } from '../../models/data-cube/types';

export interface TimeSeriesQueryOptions {
  range: [Date, Date];
}

export type TimeSeriesPoint = XYPoint<Date, number>;

export interface TimeSeriesDatum<S> {
  label: string;
  style: Partial<S>;
  points: TimeSeriesPoint[];
}

export type TimeSeriesQuery<S> = (options: TimeSeriesQueryOptions) => TimeSeriesDatum<S>[];

export type LegendItem<S> = {
  label: string;
  style: Partial<S>;
  measureName: string;
  periodOffset?: number;
  windowSize?: number;
};

export function createTimeSeriesQuery<S>(dataCube: DataCube, legendItems: LegendItem<S>[]): TimeSeriesQuery<S> {
  return queryOptions => {
    const [startDate, endDate] = queryOptions.range;
    const measureNames = [...new Set(legendItems.map(item => item.measureName))];

    const windowSizes = legendItems.map(item => item.windowSize).filter(((v): v is number => v !== undefined));
    const periodOffsets = legendItems.map(item => item.periodOffset).filter(((v): v is number => v !== undefined));

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

function createTimeSeriesDatum<S>(rows: ResultRow[], startDate: Date, endDate: Date, item: LegendItem<S>): TimeSeriesDatum<S> {
  const {
    label,
    measureName,
    periodOffset = 0,
    windowSize = DAY,
    style,
  } = item;

  const rawPoints: TimeSeriesPoint[] = rows.map(row => ({
    x: row.categories.date,
    y: row.values[measureName],
  }));

  const periodStart = startDate.getTime() + periodOffset;
  const periodEnd = endDate.getTime() + periodOffset;
  const [headPoint, ...tailPoints] = rawPoints.filter(point => {
    const time = point.x.getTime();
    return periodStart < time && time <= periodEnd;
  });

  const points: TimeSeriesPoint[] = [];

  // pre-calculate the sum of the window for the very first point
  const windowStart = headPoint.x.getTime() - windowSize;
  let startIndex = rawPoints.findIndex(point => windowStart < point.x.getTime());
  let endIndex = rawPoints.indexOf(headPoint);
  let sum = rawPoints
    .slice(startIndex, endIndex + 1)
    .reduce((acc, point) => acc + point.y, 0);
  points.push({
    x: headPoint.x,
    y: sum,
  });

  // slide the window for the rest of the points
  for (const point of tailPoints) {
    sum += rawPoints[++endIndex].y;
    sum -= rawPoints[startIndex++].y;
    points.push({
      x: point.x,
      y: sum,
    });
  }

  return {
    label,
    style,
    points,
  };
}
