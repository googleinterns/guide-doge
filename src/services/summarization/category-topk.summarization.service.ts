import * as math from 'mathjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SummarizationDataSourceService } from './summarization-data-source.service';
import { SummarizationService, BaseConfig } from './summarization.service';
import { SummaryGroup, Summary } from './types';
import { CategoricalPoint } from '../../datasets/metas/types';
import { formatY } from '../../utils/formatters';
import { createOrdinalText } from './utils/commons';

export interface CategoryTopKConfig extends BaseConfig {
  metric: string;
  topk: number;
  showPercentage: boolean;
}

export type CategoryTopKProperties = {
};

const defaultConfig: Partial<CategoryTopKConfig> = {
  metric: 'sessions',
  topk: 3,
  showPercentage: false,
};

@Injectable({
  providedIn: 'any',
})
export class CategoryTopKSummarizationService extends
  SummarizationService<CategoricalPoint, CategoryTopKProperties, CategoryTopKConfig>  {

  constructor(
    protected summarizationDataSourceService: SummarizationDataSourceService,
  ) {
    super();
  }

  prepareConfig(config: BaseConfig & Partial<CategoryTopKConfig>): CategoryTopKConfig {
    return { ...defaultConfig, ...config } as CategoryTopKConfig;
  }

  createDataProperties$(config: CategoryTopKConfig): Observable<CategoryTopKProperties> {
    return of({});
  }

  createSummaries$(config: CategoryTopKConfig): Observable<SummaryGroup[]> {
    // The length of datumLabels should be 1 for this summarization
    const { datumLabels, metric, topk, showPercentage } = config;

    return this.summarizationDataSourceService.pointsByLabels$(datumLabels)
      .pipe(map(pointsArray => {
        // datum label should be unique in data, so length of pointsArray is either 0 or 1
        const points = (pointsArray.length === 0 ? [] : pointsArray[0]) as CategoricalPoint[];

        const sortedPoints = [...points].sort(({ y: y1 }, { y: y2 }) => y2 - y1);
        const totalYSum = math.sum(points.map(({ y }) => y));
        const getPercentageText = (yValue: number) => showPercentage ? ` (${formatY(yValue / totalYSum * 100)}%)` : '';

        const summaries = sortedPoints.filter((_, i) => i < topk).map((point, i) => ({
          text: `<b>${point.x}</b> has the <b>${createOrdinalText(i + 1)}</b> highest value with <b>${formatY(point.y)}${getPercentageText(point.y)} ${metric}</b>.`,
          validity: 1.0,
        }));

        return [{
          title: `Category Top-${topk}`,
          summaries
        }];
      }));
  }
}
