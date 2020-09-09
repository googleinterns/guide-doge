import * as math from 'mathjs';
import { Summary } from './types';
import { CategoricalPoint } from '../metas/types';
import { cacheSummaries, createOrdinalText } from './utils/commons';
import { formatY } from '../../utils/formatters';

export interface Config {
  bucketPercentageTolerance: number;
  metric: string;
}

const defaultConfig: Config = {
  bucketPercentageTolerance: 5,
  metric: 'sessions',
};

export function queryFactory(points: CategoricalPoint[], config?: Partial<Config>) {
  return cacheSummaries(() => {
    const { bucketPercentageTolerance, metric } = { ...defaultConfig, ...(config ?? {}) };

    const totalYSum = math.sum(points.map(({ y }) => y));
    const sortedPoints = [...points].sort(({ y: y1 }, { y: y2 }) => y2 - y1);
    const sortedPercentagePoints = sortedPoints.map(({ x, y }) => ({ x, y: y / totalYSum * 100 }));

    const buckets = bucketizePoints(sortedPercentagePoints, bucketPercentageTolerance);

    const summaries: Summary[] = [];
    for (let i = 1; i < buckets.length; i++) {
      const bucketGreaterYAverage = math.mean(buckets[i - 1].map(({ y }) => y));
      const bucketSmallerYAverage = math.mean(buckets[i].map(({ y }) => y));

      const bucketGreaterXValuesText = buckets[i - 1].map(({ x }) => x).join(', ');
      const bucketSmallerXValuesText = buckets[i].map(({ x }) => x).join(', ');

      const haveText = buckets[i - 1].length === 1 ? 'have' : 'has';

      const yAverageDiff = bucketGreaterYAverage - bucketSmallerYAverage;
      const yAverageDiffPercentage = yAverageDiff / bucketSmallerYAverage * 100;
      const yAverageDiffText = formatY(yAverageDiff);
      const yAverageDiffPercentageText = formatY(yAverageDiffPercentage);

      const text = `<b>${bucketGreaterXValuesText}</b> ${haveText} <b>${yAverageDiffText} (${yAverageDiffPercentageText}%)</b> more ${metric} than <b>${bucketSmallerXValuesText}</b>`;

      summaries.push({
        text,
        validity: 1.0,
      });
    }
    return [{
      title: `Category Bucket Comparison - ${bucketPercentageTolerance}% Bucketization Tolerance`,
      summaries,
    }];
  });
}

function bucketizePoints(points: CategoricalPoint[], bucketPercentageTolerance: number) {
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
