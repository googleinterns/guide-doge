import * as regression from 'regression';
import * as math from 'mathjs';
import { TimeSeriesPoint, NumPoint } from '../../metas/types';
import { normalizePoints, pointToPair, pairToPoint } from '../utils/commons';
import { timeSeriesPointToNumPoint } from '../utils/time-series';
import { MINUTE, DAY, WEEK } from '../../../utils/timeUnits';

export interface LinearRegressionResult {
  gradient: number;
  gradientAngleRad: number;
  prediction: NumPoint[];
  absoluteErrorMean: number;
  absoluteErrorStd: number;
}

export function linearRegression(points: NumPoint[]): LinearRegressionResult {
  const pairs = points.map(pointToPair);
  const result = regression.linear(pairs);
  const gradient = result.equation[0];
  const gradientAngleRad = Math.atan(gradient);
  const prediction = result.points.map(pairToPoint);

  const errors = points.map(({ y }, i) => {
    return math.abs(y - prediction[i].y);
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
  idxStart: number;
  idxEnd: number;
  timeStart: Date;
  timeEnd: Date;
  pctSpan: number;
  cone: Cone2D;
}


export function normalizedUniformPartiallyLinearEpsApprox(points: TimeSeriesPoint[], eps: number): TimeSeriesPartialTrend[] {
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

// export interface TimeSeriesPartialTrend {
//   idxStart: number;
//   idxEnd: number;
//   timeStart: Date;
//   timeEnd: Date;
//   pctSpan: number;
//   cone: Cone2D;
// }

export function groupPartialTrendsByWeek(trends: TimeSeriesPartialTrend[]): TimeSeriesPartialTrend[] {
  const weekTrends: TimeSeriesPartialTrend[] = [];
  trends.sort(({ timeStart: a }, { timeStart: b }) => a.getTime() - b.getTime());
  for (const trend of trends) {
    const weekStartOffset = 4 * DAY;
    const startWeekNo = Math.floor((trend.timeStart.getTime() - weekStartOffset) / WEEK);
    const endWeekNo = Math.floor((trend.timeEnd.getTime() - weekStartOffset) / WEEK);
    if (startWeekNo === endWeekNo) {
      weekTrends.push({
        ...trend,
        idxStart: -1,
        idxEnd: -1,
      });
    } else {
      const timezoneOffset = new Date().getTimezoneOffset() * MINUTE;
      for (let weekNo = startWeekNo; weekNo <= endWeekNo; weekNo++) {
        const weekStartTime = new Date(weekNo * WEEK + timezoneOffset);
        const weekEndTime = new Date((weekNo + 1) * WEEK + weekStartOffset + timezoneOffset - 1);

        const newStartTime = new Date(Math.max(weekStartTime.getTime(), trend.timeStart.getTime()));
        const newEndTime = new Date(Math.min(weekEndTime.getTime(), trend.timeEnd.getTime()));

        const trendTimeSpan = trend.timeEnd.getTime() - trend.timeStart.getTime();
        const newTimeSpan = newEndTime.getTime() - newStartTime.getTime();
        const trendPctSpan = trend.pctSpan;
        const newPctSpan = trendPctSpan * (newTimeSpan / trendTimeSpan);

        weekTrends.push({
          ...trend,
          idxStart: -1,
          idxEnd: -1,
          timeStart: newStartTime,
          timeEnd: newEndTime,
          pctSpan: newPctSpan,
        });
      }
    }
  }
  return weekTrends;
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
