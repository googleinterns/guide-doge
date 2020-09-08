import { XYPoint } from '../metas/types';

export interface SummaryGroup {
  title: string;
  summaries: Summary[];
}

export interface Summary {
  text: string;
  validity: number;
}

export type QuerySummariesFactory<PointT> = (points: PointT[]) => () => SummaryGroup[];
