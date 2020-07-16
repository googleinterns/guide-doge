import { Summary, QuerySummariesFactory } from '../types';

export function cacheSummaries(f: () => Summary[]): () => Summary[] {
  let cache: Summary[] | null = null;
  return () => {
    if (!cache) {
      cache = f();
    }
    return cache;
  };
}

export function joinQuerySummariesFactories<PointT>(
  ...queryFactories: QuerySummariesFactory<PointT>[]): QuerySummariesFactory<PointT> {
  return (points: PointT[]) => () => {
    const summaries = queryFactories.map(f => f(points)());
    const summariesFlat = summaries.reduce((p, summary) => [...p, ...summary], []);
    return summariesFlat;
  };
}
