import { TimeSeriesPoint } from '../../queries/time-series.query';
import { DAY, WEEK } from '../../../utils/timeUnits';

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
