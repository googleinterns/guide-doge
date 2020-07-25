import { XYPoint } from '../metas/types';

export interface Summary {
  text: string;
  validity: number;
}

export type QuerySummariesFactory<PointT> = (points: PointT[]) => () => Summary[];
