import { QuerySummariesFactory, Summary } from '../types';

export function getSummaries<T>(querySummariesFactory: QuerySummariesFactory<T>, points: T[]): Summary[] {
  const summaryGroups = querySummariesFactory(points)();
  return summaryGroups.flatMap(({ summaries }) => summaries);
}
