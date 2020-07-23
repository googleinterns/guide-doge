import { XYZPoint } from '../metas/types';
import { inOneOfDateRanges } from '../../models/data-cube/filters';
import { DAY } from '../../utils/timeUnits';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { ResultRow, Category } from '../../models/data-cube/types';
import { unique } from '../../utils/misc';

export interface VRTimeSeriesQueryOptions {
  range: [Date, Date];
}

export type VRTimeSeriesPoint = XYZPoint<Category[], number, number, number>;

export interface VRTimeSeriesDatum<S> {
  labels: string[];
  style?: Partial<S>;
  points: VRTimeSeriesPoint[];
}

export type VRTimeSeriesQuery<S> = (options: VRTimeSeriesQueryOptions) => VRTimeSeriesDatum<S>[];

export type LegendItem<S> = {
  labels: string[];
  style?: Partial<S>;
  measureNames: string[];
  periodOffset?: number;
  windowSize?: number;
};

export function createVRTimeSeriesQuery<S>(dataCube: DataCube, legendItems: LegendItem<S>[]): VRTimeSeriesQuery<S> {
  return queryOptions => {
    const [startDate, endDate] = queryOptions.range;

    const measureNames = unique(legendItems.map(item => item.measureNames));

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
      categoryNames: ['browser', 'country', 'source'],
      measureNames: ['activeUsers', 'revenue', 'eventCount'],
      filters: [dateFilter],
      sortBy: [dateCategoryName],
    });

    return legendItems.map(item => createVRTimeSeriesDatum(rows, startDate, endDate, item));
  };
}

function createVRTimeSeriesDatum<S>(rows: ResultRow[], startDate: Date, endDate: Date, item: LegendItem<S>): VRTimeSeriesDatum<S> {
  const {
    labels,
    measureNames,
    periodOffset = 0,
    windowSize = DAY,
    style,
  } = item;

  // shift the datum points reversely by `periodOffset`
  const shiftedPoints: VRTimeSeriesPoint[] = rows.map(row => ({
    categories: (row.categories as unknown as Category[]),
    x: row.values[measureNames[0]],
    y: row.values[measureNames[1]],
    z: row.values[measureNames[2]]
  }));
 

  // get the head point and tail points of which lie between (`startDate`, `endDate`]
  const points: VRTimeSeriesPoint[] = shiftedPoints;

    
  
  // pre-calculate the sum of the window for the very first point
  
  // points.push({
  //   x: 10,
  //   y: 10,
  //   z: 10
  // });

  // slide the window for the rest of the points
  

  return {
    labels,
    style,
    points,
  };
}
