import * as regression from 'regression';
import * as math from 'mathjs';
import { TimeSeriesPoint, NumPoint } from '../../metas/types';
import { normalizePoints, pointToPair, pairToPoint } from '../utils/commons';
import { timeSeriesPointToNumPoint } from '../utils/time-series';

export interface LinearModel {
  /* The gradient of linear model, which is the coefficient m in equation y = mx + c */
  gradient: number;
  /* The angle between the 2D linear model (slope) and x-axis in radius */
  gradientAngleRad: number;
  /* The points with x-values from input points and predicted y-values */
  prediction: NumPoint[];
  /* The mean of absolute errors between y-values of input points and predicted y-values */
  absoluteErrorMean: number;
  /* The standard deviation of absolute errors between y-values of input points and predicted y-values */
  absoluteErrorStd: number;
}

/**
 * Create a linear model that the numerical X-Y points fit with coefficients m and c in equation
 * y = mx + c with linear regression. It minimize the residual sum of squares between the y-values
 * of input points, and the predicted y-values by the linear approximation.
 *
 * @param points The numerical X-Y points to fit a linear model
 */
export function createLinearModel(points: NumPoint[]): LinearModel {
  const pairs = points.map(pointToPair);
  const model = regression.linear(pairs);
  const gradient = model.equation[0];
  const gradientAngleRad = Math.atan(gradient);
  const prediction = model.points.map(pairToPoint);

  const errors = points.map((point, i) => {
    return Math.abs(point.y - prediction[i].y);
  });

  const absoluteErrorMean = math.mean(errors);
  const absoluteErrorStd = math.std(errors);

  return {
    gradient,
    gradientAngleRad,
    prediction,
    absoluteErrorMean,
    absoluteErrorStd,
  };
}


export interface Cone2D {
  startAngleRad: number;
  endAngleRad: number;
}

export interface TimeSeriesPartialTrend {
  /* The index of the trend's first point in points array */
  indexStart: number;
  /* The index of the trend's last point in points array */
  indexEnd: number;
  /* The time (x-value) of the trend's first point */
  timeStart: Date;
  /* The time (x-value) of the trend's last point */
  timeEnd: Date;
  /* The time span percentage of the trend to the total time span of points array */
  percentageSpan: number;
  /* The intersection of cones formed by the points belong to the trend */
  cone: Cone2D;
}

/**
 * Create an array of partial trend which approximate the normalized time-series points with uniform partially
 * linear eps-approximation. The x-values and y-values of points are normalized first regarding the size of
 * chart before extracting trends.
 *
 * Reference:
 *  Kacprzyk, Janusz, Anna Wilbik, and S. Zadrożny. "Linguistic summarization of time series using a fuzzy quantifier driven aggregation.",
 *    Fuzzy Sets and Systems 159.12 (2008): 1485-1499.
 *
 * @param points The time-series points to extract partial trends.
 * @param eps Radius of circle around points when finding the intersection of cones for a partial trend.
 */
export function createPartialTrends(points: TimeSeriesPoint[], eps: number): TimeSeriesPartialTrend[] {
  const numPoints = points.map(timeSeriesPointToNumPoint);
  const normalizedPoints = normalizePoints(numPoints, {}, { min: 0 });

  if (normalizedPoints.length <= 1) {
    return [];
  } else {
    const trends: TimeSeriesPartialTrend[] = [];
    // Modified Sklansky and Gonzalez algorithm for extracting trends
    let i = 0;
    let j = 1;
    let coneij: Cone2D;
    while (j < normalizedPoints.length) {
      let k = j;
      let coneik = createCone(normalizedPoints[i], normalizedPoints[k], eps);
      coneij = coneik;
      do {
        coneij = intersectCone(coneij, coneik) as Cone2D;
        j = k;
        k = k + 1;
        if (k === normalizedPoints.length) {
          break;
        }
        coneik = createCone(normalizedPoints[i], normalizedPoints[k], eps);
      } while (intersectCone(coneij, coneik) !== null);

      trends.push({
        indexStart: i,
        indexEnd: j,
        timeStart: points[i].x,
        timeEnd: points[j].x,
        percentageSpan: normalizedPoints[j].x - normalizedPoints[i].x,
        cone: coneij,
      });

      i = j;
      j = k;
    }
    return trends;
  }
}

function createCone(p1: NumPoint, p2: NumPoint, eps: number): Cone2D {
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx * dx + dy * dy <= eps * eps) {
    return {
      startAngleRad: -Math.PI / 2,
      endAngleRad: Math.PI / 2,
    };
  } else {
    const a1 = Math.atan((dx * dy - eps * Math.sqrt(dx * dx + dy * dy - eps * eps)) / (dx * dx - eps * eps));
    const a2 = Math.atan((dx * dy + eps * Math.sqrt(dx * dx + dy * dy - eps * eps)) / (dx * dx - eps * eps));
    return {
      startAngleRad: Math.min(a1, a2),
      endAngleRad: Math.max(a1, a2),
    };
  }
}

function intersectCone(c1: Cone2D, c2: Cone2D): Cone2D | null {
  const startAngleRad = Math.max(c1.startAngleRad, c2.startAngleRad);
  const endAngleRad = Math.min(c1.endAngleRad, c2.endAngleRad);
  if (startAngleRad <= endAngleRad) {
    return {
      startAngleRad,
      endAngleRad,
    };
  } else {
    return null;
  }
}

export function exponentialMovingAverage(points: TimeSeriesPoint[], alpha = 0.3): TimeSeriesPoint[] {
  const N = points.length;
  const yValues = points.map(({ y }) => y);

  const smoothedYValues = new Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    smoothedYValues[i] = alpha * yValues[i] + (1.0 - alpha) * (smoothedYValues[i - 1] ?? yValues[i]);
  }

  const smoothedPoints = smoothedYValues.map((y, i) => ({
    x: points[i].x,
    y,
  }));
  return smoothedPoints;
}
