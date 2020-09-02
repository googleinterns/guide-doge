import { Summary } from '../types';

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

export function andNotSummaryFilters(...filters: ((summary: Summary) => boolean)[]) {
  return (summary: Summary) => {
    return filters.every(filter => !filter(summary));
  };
}
