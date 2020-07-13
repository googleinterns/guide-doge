import { Summary } from './types';
import { TimeSeriesPoint } from '../queries/time-series.query';
import { DAY } from '../../utils/timeUnits';

export type SummariesQueryFactory = (points: TimeSeriesPoint[]) => () => Summary[];

export function joinSummariesQueryFactories(...queryFactories: SummariesQueryFactory[]): SummariesQueryFactory {
  return (points: TimeSeriesPoint[]) => () => {
    const summaries = queryFactories.map(f => f(points)());
    const summariesFlat = summaries.reduce((p, summary) => [...p, ...summary], []);
    return summariesFlat;
  };
}

export function tFunc(bStart: number, cStart: number, cEnd: number, bEnd: number) {
  return (v) => {
    if (v < bStart) {
      return 0.0;
    } else if (bStart <= v && v < cStart) {
      return (v - bStart) / (cStart - bStart);
    } else if (cStart <= v && v < cEnd) {
      return 1.0;
    } else if (cEnd <= v && v < bEnd) {
      return 1.0 - (v - cEnd) / (bEnd - cEnd);
    } else {
      return 0.0;
    }
  };
}

export function tFuncL(bStart: number, cStart: number) {
  return tFunc(bStart, cStart, Infinity, Infinity);
}

export function tFuncR(cEnd: number, bEnd: number) {
  return tFunc(-Infinity, -Infinity, cEnd, bEnd);
}

export function groupByWeek(points: TimeSeriesPoint[]): TimeSeriesPoint[][] {
  const weekPoints: Record<string, TimeSeriesPoint[]> = {};
  for (const point of points) {
    const week = Math.floor((point.x.getTime() - 4 * DAY) / (7 * DAY));
    weekPoints[week] = [...(weekPoints[week] ?? []), point];
  }
  const sortedWeekPointPairs = Object.entries(weekPoints).sort(([wa], [wb]) => Number(wa) - Number(wb));
  return sortedWeekPointPairs.map(([_, currentWeekPoints]) => currentWeekPoints);
}
