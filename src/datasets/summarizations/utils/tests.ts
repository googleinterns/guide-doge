import { QuerySummariesFactory, Summary } from '../types';

export function getSummaries<T>(querySummariesFactory: QuerySummariesFactory<T>, points: T[]): Summary[] {
  const summaryGroups = querySummariesFactory(points)();
  return summaryGroups.flatMap(({ summaries }) => summaries);
}

export function hasHighValidity({ validity }) {
  return validity >= 0.7;
}

export function hasLowValidity(summary: Summary) {
  return !hasHighValidity(summary);
}

export function isTextPartsInSummary(...textParts: string[]) {
  return (summary: Summary) => {
    return textParts.every(textPart => summary.text.includes(textPart));
  };
}

export function norSummaryFilters(...filters: ((summary: Summary) => boolean)[]) {
  return (summary: Summary) => {
    return filters.every(filter => !filter(summary));
  };
}
