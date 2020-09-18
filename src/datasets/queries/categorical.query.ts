import { CategoricalPoint } from '../metas/types';
import { DAY } from '../../utils/timeUnits';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { ResultRow } from '../../models/data-cube/types';
import { unique } from '../../utils/misc';
import { SummaryGroup } from '../summarizations/types';
import { XYDatum } from '../metas/types';

export type CategoricalQueryOptions = {};

export interface CategoricalDatum<S> extends XYDatum<CategoricalPoint> {
  style?: Partial<S>;
}

export type CategoricalQuery<S> = (options: CategoricalQueryOptions) => CategoricalDatum<S>[];

export type LegendItem<S> = {
  label: string;
  style?: Partial<S>;
  querySummariesFactory?: (points: CategoricalPoint[]) => () => SummaryGroup[];
};
