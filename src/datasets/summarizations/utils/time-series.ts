import { TimeSeriesPoint } from '../../queries/time-series.query';
import { DAY } from '../../../utils/timeUnits';

export function groupPointsByXWeek(points: TimeSeriesPoint[]): TimeSeriesPoint[][] {
  const weekPoints: Record<string, TimeSeriesPoint[]> = {};
  for (const point of points) {
    const week = Math.floor((point.x.getTime() - 4 * DAY) / (7 * DAY));
    weekPoints[week] = [...(weekPoints[week] ?? []), point];
  }
  const sortedWeekPointPairs = Object.entries(weekPoints).sort(([wa], [wb]) => Number(wa) - Number(wb));
  return sortedWeekPointPairs.map(([_, currentWeekPoints]) => currentWeekPoints);
}
