import { QuerySummariesFactory, Summary } from '../types';
import { TimeSeriesPoint, CategoricalPoint } from '../../../datasets/metas/types';
import { SummarizationService, BaseConfig } from '../summarization.service';
import { SummarizationDataSourceService } from '../summarization-data-source.service';

export function testSummaries<T extends TimeSeriesPoint | CategoricalPoint, P, C extends BaseConfig>(
  summarizationService: SummarizationService<T, P, C>,
  summarizationDataSourceService: SummarizationDataSourceService,
  points: T[],
  config: Partial<C>,
  handler: (summaries: Summary[]) => void) {
  const TEST_LABEL = 'TEST_LABEL';

  const data = [{ label: TEST_LABEL, points }];
  summarizationDataSourceService.data$.next(data);
  summarizationService.summaries$({ datumLabels: [TEST_LABEL], ...config })
    .subscribe(summaryGroups => {
      handler(summaryGroups.map(({ summaries }) => summaries).flat());
    });
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
