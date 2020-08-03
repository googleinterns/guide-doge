import { Summary, QuerySummariesFactory } from '../types';
import { XYPoint, NumPoint } from '../../metas/types';

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

export function pointToPair<X, Y>(p: XYPoint<X, Y>): [X, Y] {
  return [p.x, p.y];
}

export function pairToPoint<X, Y>(p: [X, Y]): XYPoint<X, Y> {
  const [x, y] = p;
  return { x, y };
}

interface ChartAxisLimit {
  min?: number;
  max?: number;
}

export function normalizePointsX<T>(points: XYPoint<number, T>[], xlim: ChartAxisLimit = {}): XYPoint<number, T>[] {
  const xValues = points.map(({ x }) => x);
  const {
    min: xmin = Math.min(...xValues),
    max: xmax = Math.max(...xValues),
  } = xlim;

  return points.map(({ x, y }) => ({
    x: (x - xmin) / (xmax - xmin),
    y,
  }));
}

export function normalizePointsY<T>(points: XYPoint<T, number>[], ylim: ChartAxisLimit = {}): XYPoint<T, number>[] {
  const yValues = points.map(({ y }) => y);
  const {
    min: ymin = 0,
    max: ymax = Math.max(...yValues),
  } = ylim;

  return points.map(({ x, y }) => ({
    x,
    y: (y - ymin) / (ymax - ymin) * 5 / 8,
  }));
}

export function normalizePoints(points: NumPoint[], xlim: ChartAxisLimit = {}, ylim: ChartAxisLimit = {}): NumPoint[] {
  return normalizePointsY(normalizePointsX(points, xlim), ylim);
}
