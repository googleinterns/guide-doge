import { ScatterPoint } from '../metas/types';
import { inOneOfDateRanges } from '../../models/data-cube/filters';
import { DAY } from '../../utils/timeUnits';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { ResultRow, Category } from '../../models/data-cube/types';
import { unique } from '../../utils/misc';

export interface VRQueryOptions {
  range: [Date, Date];
}

export type VRScatterPoint = ScatterPoint<Record<string, string>>;

export interface VRData<S> {
  labels: string[];
  style?: Partial<S>;
  points: VRScatterPoint[];
}

export type VRQuery<S> = (options: VRQueryOptions) => VRData<S>[];

export type LegendItem = {
  labels: string[];
  measureNames: string[];
  periodOffset?: number;
  windowSize?: number;
};

export function createVRQuery<S>(dataCube: DataCube, legendItems: LegendItem[]): VRQuery<S> {
  return (queryOptions) => {
    const measureNames = unique(legendItems.map(item => item.measureNames));
    const rows = dataCube.getDataFor({
      categoryNames: ['browser', 'country', 'source'],
      measureNames: ['activeUsers', 'revenue', 'eventCount'],
    });

    return legendItems.map(item => createVRData(rows, item));
  };
}

export function createVRData<S>(rows: ResultRow[], item: LegendItem): VRData<S> {
  const {
    labels,
    measureNames,
  } = item;

  // shift the datum points reversely by `periodOffset`
  const shiftedPoints: VRScatterPoint[] = rows.map(row => ({
    categories: (row.categories as Record<string, string>),
    x: row.values[measureNames[0]],
    y: row.values[measureNames[1]],
    z: row.values[measureNames[2]]
  }));
  // get the head point and tail points of which lie between (`startDate`, `endDate`]
  const points: VRScatterPoint[] = shiftedPoints;
  return {
    labels,
    points,
  };
}
