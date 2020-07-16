import { XYZPoint } from '../metas/types';
import { inOneOfDateRanges } from '../../models/data-cube/filters';
import { DAY } from '../../utils/timeUnits';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { ResultRow } from '../../models/data-cube/types';
import { unique } from '../../utils/misc';

export interface VRTimeSeriesQueryOptions {
  range: [Date, Date];
}

export type VRTimeSeriesPoint = XYZPoint<Date, number, number>;

export interface VRTimeSeriesDatum<S> {
  label: string;
  style?: Partial<S>;
  points: VRTimeSeriesPoint[];
}

export type VRTimeSeriesQuery<S> = (options: VRTimeSeriesQueryOptions) => VRTimeSeriesDatum<S>[];

export type LegendItem<S> = {
  label: string;
  style?: Partial<S>;
  measureName: string;
  periodOffset?: number;
  windowSize?: number;
};

export function createVRTimeSeriesQuery<S>(dataCube: DataCube, legendItems: LegendItem<S>[]): VRTimeSeriesQuery<S> {
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

    return legendItems.map(item => createVRTimeSeriesDatum(rows, startDate, endDate, item));
  };
}

function createVRTimeSeriesDatum<S>(rows: ResultRow[], startDate: Date, endDate: Date, item: LegendItem<S>): VRTimeSeriesDatum<S> {
  const {
    label,
    measureName,
    periodOffset = 0,
    windowSize = DAY,
    style,
  } = item;

  // shift the datum points reversely by `periodOffset`
  const shiftedPoints: VRTimeSeriesPoint[] = rows.map(row => ({
    x: new Date(row.categories.date.getTime() - periodOffset),
    y: row.values[measureName],
    z: row.values[measureName]
  }));

  // get the head point and tail points of which lie between (`startDate`, `endDate`]
  const [headPoint, ...tailPoints] = shiftedPoints.filter(point => startDate < point.x && point.x <= endDate);
  const points: VRTimeSeriesPoint[] = [];

  if (!headPoint) {
    return {
      label,
      style,
      points,
    };
  }

  // pre-calculate the sum of the window for the very first point
  const windowStart = headPoint.x.getTime() - windowSize;
  let startIndex = shiftedPoints.findIndex(point => windowStart < point.x.getTime());
  let endIndex = shiftedPoints.indexOf(headPoint);
  let sum = shiftedPoints
    .slice(startIndex, endIndex + 1)
    .reduce((acc, point) => acc + point.y, 0);
  points.push({
    x: headPoint.x,
    y: sum,
    z: sum
  });

  // slide the window for the rest of the points
  for (const point of tailPoints) {
    sum += shiftedPoints[++endIndex].y;
    sum -= shiftedPoints[startIndex++].y;
    points.push({
      x: point.x,
      y: sum,
      z: sum
    });
  }

  return {
    label,
    style,
    points,
  };
}
