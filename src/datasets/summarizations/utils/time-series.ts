import { TimeSeriesPoint } from '../../queries/time-series.query';
import { DAY, WEEK } from '../../../utils/timeUnits';
import { XYPoint } from 'src/datasets/metas/types';

/**
 * Group time-series points by the week number of their x-values (date).
 * The first day of the week is Monday when computing the week number of
 * a date.
 *
 * @param points The array of time-series point to group
 * @return The group result. Each of the element in the returned array is an
 * array of time-series points which have the x-values (date) in the same week.
 * The week arrays are sorted by the week number and the points in each array
 * are sorted by the x-value (date) in ascending order.
 */
export function groupPointsByXWeek(points: TimeSeriesPoint[]): TimeSeriesPoint[][] {
  const weekStartOffset = 4 * DAY;
  const weekPoints: Record<string, TimeSeriesPoint[]> = {};
  points.sort(({ x: a }, { x: b }) => a.getTime() - b.getTime());
  for (const point of points) {
    const week = Math.floor((point.x.getTime() - weekStartOffset) / WEEK);
    weekPoints[week] = [...(weekPoints[week] ?? []), point];
  }
  const sortedWeekPointPairs = Object.entries(weekPoints).sort(([wa], [wb]) => Number(wa) - Number(wb));
  return sortedWeekPointPairs.map(([_, currentWeekPoints]) => currentWeekPoints);
}

export function kalmanSmoothing(points: TimeSeriesPoint[]): TimeSeriesPoint[] {
  const N = points.length;
  const zs = points.map(({ y }) => y);

  // Kalman Filter
  const F = 1.0;
  const Q = 0.0;
  const H = 1.0;
  const R = 0.00001;

  const xinit = zs[0];
  const Pinit = 10;

  const xs: number[] = [...new Array(N).fill(0)];
  const Ps: [number, number][] = [...new Array(N).fill([0, 0])];
  for (let k = 0; k < N; k++) {
    const z = zs[k];
    if (k === 0) {
      xs[k] = xinit;
      Ps[k] = [Pinit, Pinit];
    } else {
      const Pk = F * Ps[k - 1][1] * F + Q;
      const S = R + H * Pk * H;
      const K = Pk * H * (1 / S);
      const Pkk = (1.0 - K * H) * Pk;
      const xk = F * xs[k - 1] + K * (z - H * F * xs[k - 1]);

      Ps[k] = [Pk, Pkk];
      xs[k] = xk;
    }
  }

  // Rauch–Tung–Striebel (RTS) smoother
  const xps: number[] = new Array(xs.length).fill(0);
  for (let k = N - 1; k >= 0; k--) {
    if (k === N - 1) {
      xps[k] = xs[k];
    } else {
      const C = Ps[k][1] * F * (1 / Ps[k + 1][0]);
      xps[k] = xs[k] + C * (xps[k + 1] - xs[k + 1]);
    }
  }

  const smoothedPoints = xps.map((xp, i) => ({
    x: points[i].x,
    y: xp,
  }));

  return smoothedPoints;
}

export interface Cone2D {
  startAngleRad: number;
  endAngleRad: number;
}

export interface TimeSeriesTrend {
  pctStart: number;
  pctSpan: number;
  cone: Cone2D;
}


export function normalizedUniformPartiallyLinearEpsApprox(points: TimeSeriesPoint[], eps: number): TimeSeriesTrend[] {
  const numPoints = points.map(timeSeriesPointToNumPoint);
  const normalizedPoints = normalizeNumPoints(numPoints, {}, { min: 0 });

  if (normalizedPoints.length <= 1) {
    return [];
  } else {
    const trends: TimeSeriesTrend[] = [];
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
        pctStart: normalizedPoints[i].x,
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

type NumPoint = XYPoint<number, number>;

function timeSeriesPointToNumPoint(point: TimeSeriesPoint) {
  return {
    x: point.x.getTime(),
    y: point.y,
  };
}

interface ChartAxisLimit {
  min?: number;
  max?: number;
}

export function normalizePointsX<T>(points: XYPoint<number, T>[], xlim: ChartAxisLimit = {}): XYPoint<number, T>[] {
  const xValues = points.map(({ x }) => x);
  const {
    min: xmin = Math.min(...xValues),
    max: xmax = Math.max(...xValues),
  } = xlim;

  return points.map(({ x, y }) => ({
    x: (x - xmin) / (xmax - xmin),
    y,
  }));
}

export function normalizePointsY<T>(points: XYPoint<T, number>[], ylim: ChartAxisLimit = {}): XYPoint<T, number>[] {
  const yValues = points.map(({ y }) => y);
  const {
    min: ymin = Math.min(...yValues),
    max: ymax = Math.max(...yValues),
  } = ylim;

  return points.map(({ x, y }) => ({
    x,
    y: (y - ymin) / (ymax - ymin) * 5 / 8,
  }));
}

export function normalizeNumPoints(points: NumPoint[], xlim: ChartAxisLimit = {}, ylim: ChartAxisLimit = {}): NumPoint[] {
  return normalizePointsY(normalizePointsX(points, xlim), ylim);
}
