import { XYZPoint } from '../metas/types';
import { inOneOfDateRanges } from '../../models/data-cube/filters';
import { DAY } from '../../utils/timeUnits';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { ResultRow, Category } from '../../models/data-cube/types';
import { unique } from '../../utils/misc';

export interface VRQueryOptions {
  range: [Date, Date];
}

export type VRPoint = XYZPoint<Category[], number, number, number>;

export interface VRDatum<S> {
  labels: string[];
  style?: Partial<S>;
  points: VRPoint[];
}

export type VRQuery<S> = (options: VRQueryOptions) => VRDatum<S>[];

export type LegendItem<S> = {
  labels: string[];
  style?: Partial<S>;
  measureNames: string[];
  periodOffset?: number;
  windowSize?: number;
};

export function createVRQuery<S>(dataCube: DataCube, legendItems: LegendItem<S>[]): VRQuery<S> {
  return queryOptions => {
    const [startDate, endDate] = queryOptions.range;

    const measureNames = unique(legendItems.map(item => item.measureNames));

    const rows = dataCube.getDataFor({
      categoryNames: ['browser', 'country', 'source'],
      measureNames: ['activeUsers', 'revenue', 'eventCount'],
    });

    return legendItems.map(item => createVRDatum(rows, item));
  };
}

function createVRDatum<S>(rows: ResultRow[], item: LegendItem<S>): VRDatum<S> {
  const {
    labels,
    measureNames,
    style,
  } = item;

  // shift the datum points reversely by `periodOffset`
  const shiftedPoints: VRPoint[] = rows.map(row => ({
    categories: (row.categories as unknown as Category[]),
    x: row.values[measureNames[0]],
    y: row.values[measureNames[1]],
    z: row.values[measureNames[2]]
  }));

  // get the head point and tail points of which lie between (`startDate`, `endDate`]
  const points: VRPoint[] = shiftedPoints;
  return {
    labels,
    style,
    points,
  };
}
