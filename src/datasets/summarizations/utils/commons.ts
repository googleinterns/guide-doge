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

/**
 * Create a query-summary-factory which returns the concatenation of summaries returned
 * by the input query factories. The returned function does not pre-compute the returned
 * summaries from the input queryFactories, and it does not cache the concatenated
 * sumaries. The cache and lazy evaluation need to be implemented by each input
 * query-summary-factory individually.
 */
export function combineQuerySummariesFactories<PointT>(
  ...queryFactories: QuerySummariesFactory<PointT>[]): QuerySummariesFactory<PointT> {
  return (points: PointT[]) => () => {
    const summaries = queryFactories.map(f => f(points)());
    const summariesFlat = ([] as Summary[]).concat(...summaries);
    return summariesFlat;
  };
}
