import * as math from 'mathjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SummarizationDataSourceService } from './summarization-data-source.service';
import { SummarizationService, BaseConfig } from './summarization.service';
import { SummaryGroup, Summary } from './types';
import { CategoricalPoint } from '../../datasets/metas/types';
import { formatY } from '../../utils/formatters';

export interface CategoryBucketComparisonConfig extends BaseConfig {
  metric: string;
  bucketPercentageTolerance: number;
}

export type CategoryBucketComparisonProperties = {
};

const defaultConfig: Partial<CategoryBucketComparisonConfig> = {
  metric: 'sessions',
  bucketPercentageTolerance: 5,
};

@Injectable({
  providedIn: 'any',
})
export class CategoryBucketComparisonSummarizationService extends
  SummarizationService<CategoricalPoint, CategoryBucketComparisonProperties, CategoryBucketComparisonConfig>  {

  constructor(
    protected summarizationDataSourceService: SummarizationDataSourceService,
  ) {
    super();
  }

  prepareConfig(config: BaseConfig & Partial<CategoryBucketComparisonConfig>): CategoryBucketComparisonConfig {
    return { ...defaultConfig, ...config } as CategoryBucketComparisonConfig;
  }

  createDataProperties$(config: CategoryBucketComparisonConfig): Observable<CategoryBucketComparisonProperties> {
    return of({});
  }

  /**
   * Create summaries that describe the difference of y-values average between buckets.
   * The bucket is a subset of data with similar y-values.
   *
   * Sample Summaries:
   * -  Desktop has 56.4 (129.4%) more sessions than Mobile and Tablet.
   */
  createSummaries$(config: CategoryBucketComparisonConfig): Observable<SummaryGroup[]> {
    // The length of datumLabels should be 1 for this summarization
    const { datumLabels, metric, bucketPercentageTolerance } = config;

    return this.summarizationDataSourceService.pointsByLabels$(datumLabels)
      .pipe(map(pointsArray => {
        // datum label should be unique in data, so length of pointsArray is either 0 or 1
        const points = (pointsArray.length === 0 ? [] : pointsArray[0]) as CategoricalPoint[];

        const maxYValue = Math.max(...points.map(({ y }) => y));
        const sortedPoints = [...points].sort(({ y: y1 }, { y: y2 }) => y2 - y1);
        const sortedRelativePercentagePoints = sortedPoints.map(({ x, y }) => ({ x, y: y / maxYValue * 100 }));

        const buckets = this.bucketizePoints(sortedRelativePercentagePoints, bucketPercentageTolerance);

        const summaries: Summary[] = [];
        for (let i = 1; i < buckets.length; i++) {
          const bucketGreaterYAverage = math.mean(buckets[i - 1].map(({ y }) => y));
          const bucketSmallerYAverage = math.mean(buckets[i].map(({ y }) => y));

          const bucketGreaterXValuesText = buckets[i - 1].map(({ x }) => x).join(', ');
          const bucketSmallerXValuesText = buckets[i].map(({ x }) => x).join(', ');

          const haveText = buckets[i - 1].length === 1 ? 'has' : 'have';

          const yAverageDiff = bucketGreaterYAverage - bucketSmallerYAverage;
          const yAverageDiffPercentage = yAverageDiff / bucketSmallerYAverage * 100;
          const yAverageDiffText = formatY(yAverageDiff);
          const yAverageDiffPercentageText = formatY(yAverageDiffPercentage);

          const text = `<b>${bucketGreaterXValuesText}</b> ${haveText} <b>${yAverageDiffText} (${yAverageDiffPercentageText}%)</b> more ${metric} than <b>${bucketSmallerXValuesText}</b>.`;

          summaries.push({
            text,
            validity: 1.0,
          });
        }
        return [{
          title: `Category Bucket Comparison - ${bucketPercentageTolerance}% Bucketization Tolerance`,
          summaries,
        }];
      }));
  }


  private bucketizePoints(points: CategoricalPoint[], bucketPercentageTolerance: number) {
    const buckets: CategoricalPoint[][] = [];
    let currentBucket: CategoricalPoint[] = [];

    for (const { x, y } of points) {
      const currentBucketYMax = currentBucket[0]?.y ?? null;

      if (currentBucketYMax === null || currentBucketYMax - y < bucketPercentageTolerance) {
        currentBucket.push({ x, y });
      } else {
        buckets.push(currentBucket);
        currentBucket = [{ x, y }];
      }
    }
    if (currentBucket.length > 0) {
      buckets.push(currentBucket);
    }

    return buckets;
  }
}
