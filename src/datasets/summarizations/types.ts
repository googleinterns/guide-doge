import { XYPoint } from '../metas/types';

export interface Summary {
  text: string;
  validity: number;
}

export interface SummaryGroup {
  name: string;
  summaries: Summary[];
}

export type QuerySummariesFactory<PointT> = (points: PointT[]) => () => SummaryGroup[];
