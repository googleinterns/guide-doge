import { Summary, SummariesQueryFactory } from '../types';

export function cacheSummaries(f: () => Summary[]): () => Summary[] {
  let cache: Summary[] | null = null;
  return () => {
    if (!cache) {
      cache = f();
    }
    return cache;
  };
}

export function joinSummariesQueryFactories<PointT>(
  ...queryFactories: SummariesQueryFactory<PointT>[]): SummariesQueryFactory<PointT> {
  return (points: PointT[]) => () => {
    const summaries = queryFactories.map(f => f(points)());
    const summariesFlat = summaries.reduce((p, summary) => [...p, ...summary], []);
    return summariesFlat;
  };
}
