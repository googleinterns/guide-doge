import * as regression from 'regression';
import * as math from 'mathjs';
import { TimeSeriesPoint, NumPoint } from '../../metas/types';
import { normalizePointsX, normalizePointsY, pointToPair, pairToPoint } from '../utils/commons';
import { timeSeriesPointToNumPoint } from '../utils/time-series';
import { sum } from '../../../utils/misc';

export interface LinearRegressionResult {
  gradient: number;
  gradientAngleRad: number;
  yIntercept: number;
  r2: number;
  prediction: NumPoint[];
  errorStd: number;
  absoluteErrorMean: number;
}

export function linearRegression(points: NumPoint[]): LinearRegressionResult {
  const pairs = points.map(pointToPair);
  const result = regression.linear(pairs);
  const gradient = result.equation[0];
  const yIntercept = result.equation[1];
  const r2 = result.r2;
  const gradientAngleRad = Math.atan(gradient);
  const prediction = result.points.map(pairToPoint);

  const errors = points.map(({ y }, i) => {
    return y - prediction[i].y;
  });

  const errorStd = math.std(errors);
  const absoluteErrorMean = math.mean(errors.map(e => Math.abs(e)));

  return {
    gradient,
    gradientAngleRad,
    yIntercept,
    r2,
    prediction,
    errorStd,
    absoluteErrorMean,
  };
}


export interface Cone2D {
  startAngleRad: number;
  endAngleRad: number;
}

export interface TimeSeriesPartialTrend {
  idxStart: number;
  idxEnd: number;
  timeStart: Date;
  timeEnd: Date;
  pctSpan: number;
  cone: Cone2D;
}


export function normalizedUniformPartiallyLinearEpsApprox(
  points: TimeSeriesPoint[],
  eps: number,
  normalizeY = true): TimeSeriesPartialTrend[] {
  const numPoints = points.map(timeSeriesPointToNumPoint);
  const normalizedXPoints = normalizePointsX(numPoints);
  const normalizedPoints = normalizeY ? normalizePointsY(normalizedXPoints) : normalizedXPoints;

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
      let coneik = calcCone(normalizedPoints[i], normalizedPoints[k], eps);
      coneij = coneik;
      do {
        coneij = intersectCone(coneij, coneik) as Cone2D;
        j = k;
        k = k + 1;
        if (k === normalizedPoints.length) {
          break;
        }
        coneik = calcCone(normalizedPoints[i], normalizedPoints[k], eps);
      } while (intersectCone(coneij, coneik) !== null);

      trends.push({
        idxStart: i,
        idxEnd: j,
        timeStart: points[i].x,
        timeEnd: points[j].x,
        pctSpan: normalizedPoints[j].x - normalizedPoints[i].x,
        cone: coneij,
      });

      i = j;
      j = k;
    }
    return trends;
  }
}

function calcCone(p1: NumPoint, p2: NumPoint, eps: number): Cone2D {
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
  const ys = points.map(({ y }) => y);

  const Ss = new Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    Ss[i] = alpha * ys[i] + (1.0 - alpha) * (Ss[i - 1] ?? ys[i]);
  }

  const smoothedPoints = Ss.map((S, i) => ({
    x: points[i].x,
    y: S,
  }));
  return smoothedPoints;
}

export function centeredMovingAverage(points: TimeSeriesPoint[], k: number): TimeSeriesPoint[] {
  const L = points.length;
  const smoothedPoints: TimeSeriesPoint[] = [];
  for (let i = 0; i < points.length; i++) {
    const lSumPoints = points.slice(Math.max(0, i - k), Math.min(L, i + k));
    const rSumPoints = points.slice(Math.max(0, i - k + 1), Math.min(L, i + k + 1));

    const lSum = sum(lSumPoints.map(({ y }) => y));
    const rSum = sum(rSumPoints.map(({ y }) => y));

    const smoothedY = 0.5 * (lSum / lSumPoints.length + rSum / rSumPoints.length);
    smoothedPoints.push({
      x: points[i].x,
      y: smoothedY,
    });
  }
  return smoothedPoints;
}

export type GroupIdentifier = string | number;
export interface DecompositionResult {
  detrendPoints: TimeSeriesPoint[];
  seasonPoints: TimeSeriesPoint[];
  residualPoints: TimeSeriesPoint[];
}

export function additiveDecomposition(
  points: TimeSeriesPoint[],
  trendPoints: TimeSeriesPoint[],
  groupFn: (point: TimeSeriesPoint) => GroupIdentifier): DecompositionResult {

  const detrendPoints = points.map(({ x, y }, i) => ({
    x,
    y: y - trendPoints[i].y,
  }));

  const groups: Record<GroupIdentifier, TimeSeriesPoint[]> = {};

  for (const point of detrendPoints) {
    const gid = groupFn(point);
    groups[gid] = [point, ...(groups[gid] ?? [])];
  }

  const groupAverages: Record<GroupIdentifier, number> = {};
  for (const [gid, gpoints] of Object.entries(groups)) {
    const s = sum(gpoints.map(({ y }) => y));
    const average = s / gpoints.length;
    groupAverages[gid] = average;
  }

  const seasonPoints = points.map(({ x, y }) => ({
    x,
    y: groupAverages[groupFn({ x, y })],
  }));
  const residualPoints = points.map(({ x, y }, i) => ({
    x,
    y: y - trendPoints[i].y - seasonPoints[i].y,
  }));

  return {
    detrendPoints,
    seasonPoints,
    residualPoints,
  };
}
