import { TimeSeriesPoint } from '../metas/types';
import { inOneOfDateRanges } from '../../models/data-cube/filters';
import { DAY } from '../../utils/timeUnits';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { ResultRow } from '../../models/data-cube/types';
import { unique } from '../../utils/misc';
import { Summary } from '../summarizations/types';

export interface TimeSeriesQueryOptions {
  range: [Date, Date];
}

export interface TimeSeriesDatum<S> {
  label: string;
  style?: Partial<S>;
  points: TimeSeriesPoint[];
  querySummaries?: () => Summary[];
}

export type TimeSeriesQuery<S> = (options: TimeSeriesQueryOptions) => {
  data: TimeSeriesDatum<S>[],
  querySummaries?: () => Summary[],
};

export type LegendItem<S> = {
  /* The label for TimeSeriesDatum */
  label: string;
  /* The style for TimeSeriesDatum */
  style?: Partial<S>;
  /* The name of measure for getting data from DataCube */
  measureName: string;
  /* The offset that is subtracted from the x-values (dates) of points */
  periodOffset?: number;
  /* The size of time window for taking the sum of all dates within the window */
  windowSize?: number;
  querySummariesFactory?: (points: TimeSeriesPoint[]) => () => Summary[];
};

/**
 * Creates time-series data query function based on data cube and legend item configurations.
 *
 * The data cube must contain a "date" category and measures with names presented in `measureName`
 * of legend items in `legendItems`.
 *
 * The data query function takes an option in TimeSeriesQueryOptions and returns a list of
 * TimeSeriesDatum, where each datum in the list corresponds to a LegendItem presented in
 * `legendItems`. The `periodOffset` and `windowSize` in LegendItem are used to make the points
 * of the datum if presented, and the `label` and `style` are then attached to the fields in
 * the returned datum.
 *
 */
export function createTimeSeriesQuery<S>(
  dataCube: DataCube,
  legendItems: LegendItem<S>[],
  querySummariesFactory?: (dataPoints: TimeSeriesPoint[][]) => () => Summary[]): TimeSeriesQuery<S> {

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

    const data = legendItems.map(item => createTimeSeriesDatum(rows, startDate, endDate, item));
    const queryResult: {
      data: TimeSeriesDatum<S>[],
      querySummaries?: () => Summary[],
    } = { data };

    if (querySummariesFactory) {
      queryResult.querySummaries = querySummariesFactory(data.map(({ points }) => points));
    }

    return queryResult;
  };
}

function createTimeSeriesDatum<S>(rows: ResultRow[], startDate: Date, endDate: Date, item: LegendItem<S>): TimeSeriesDatum<S> {
  const {
    label,
    measureName,
    periodOffset = 0,
    windowSize = DAY,
    querySummariesFactory,
    style,
  } = item;

  // shift the datum points reversely by `periodOffset`
  const shiftedPoints: TimeSeriesPoint[] = rows.map(row => ({
    x: new Date(row.categories.date.getTime() - periodOffset),
    y: row.values[measureName],
  }));

  // get the head point and tail points of which lie between (`startDate`, `endDate`]
  const [headPoint, ...tailPoints] = shiftedPoints.filter(point => startDate < point.x && point.x <= endDate);
  const points: TimeSeriesPoint[] = [];

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
  });

  // slide the window for the rest of the points
  for (const point of tailPoints) {
    sum += shiftedPoints[++endIndex].y;
    sum -= shiftedPoints[startIndex++].y;
    points.push({
      x: point.x,
      y: sum,
    });
  }

  const datum: TimeSeriesDatum<S> = {
    label,
    style,
    points,
  };

  if (querySummariesFactory) {
    datum.querySummaries = querySummariesFactory(points);
  }

  return datum;
}
