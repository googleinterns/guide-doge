import * as math from 'mathjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SummarizationDataSourceService } from './summarization-data-source.service';
import { SummarizationService, BaseConfig } from './summarization.service';
import { SummaryGroup, Summary } from './types';
import { CategoricalPoint } from '../../datasets/metas/types';
import { formatY } from '../../utils/formatters';

export interface CategoryTopKCoverageConfig extends BaseConfig {
  metric: string;
  topk: number;
  xlabel: string;
}

export type CategoryTopKCoverageProperties = {
};

const defaultConfig: Partial<CategoryTopKCoverageConfig> = {
  metric: 'sessions',
  topk: 3,
  xlabel: 'countries',
};

@Injectable({
  providedIn: 'any',
})
export class CategoryTopKCoverageSummarizationService extends
  SummarizationService<CategoricalPoint, CategoryTopKCoverageProperties, CategoryTopKCoverageConfig>  {

  constructor(
    protected summarizationDataSourceService: SummarizationDataSourceService,
  ) {
    super();
  }

  prepareConfig(config: BaseConfig & Partial<CategoryTopKCoverageConfig>): CategoryTopKCoverageConfig {
    return { ...defaultConfig, ...config } as CategoryTopKCoverageConfig;
  }

  createDataProperties$(config: CategoryTopKCoverageConfig): Observable<CategoryTopKCoverageProperties> {
    return of({});
  }

  createSummaries$(config: CategoryTopKCoverageConfig): Observable<SummaryGroup[]> {
    // The length of datumLabels should be 1 for this summarization
    const { datumLabels, metric, topk, xlabel } = config;

    return this.summarizationDataSourceService.pointsByLabels$(datumLabels)
      .pipe(map(pointsArray => {
        // datum label should be unique in data, so length of pointsArray is either 0 or 1
        const points = (pointsArray.length === 0 ? [] : pointsArray[0]) as CategoricalPoint[];

        const isTopkFilter = (_: any, i: number) => i < topk;
        const sortedPoints = [...points].sort(({ y: y1 }, { y: y2 }) => y2 - y1);
        const actualTopk = Math.min(topk, points.length);

        const xValues = sortedPoints.map(({ x }) => x);
        const yValues = sortedPoints.map(({ y }) => y);
        const totalYSum = math.sum(yValues);
        const topkYSum = math.sum(yValues.filter(isTopkFilter));

        const topkXValuesText = xValues.filter(isTopkFilter).join(', ');
        const topkCoverageText = formatY(topkYSum / totalYSum * 100);
        const text = `The <b>top ${actualTopk}</b> ${xlabel} with the highest value <b>(${topkXValuesText})</b> contain <b>${topkCoverageText}%</b> of total ${metric}.`;

        return [{
          title: `Category Top-${topk} Coverage`,
          summaries: [{
            text,
            validity: 1.0,
          }]
        }];
      }));
  }
}
