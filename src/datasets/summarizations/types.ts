import { XYPoint } from '../metas/types';

export interface Summary {
  text: string;
  validity: number;
}

export type SummariesQueryFactory<PointT> = (points: PointT[]) => () => Summary[];
