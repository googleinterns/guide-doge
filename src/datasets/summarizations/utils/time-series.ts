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
  const weekPoints: Record<string, TimeSeriesPoint[]> = {};
  points.sort(({ x: a }, { x: b }) => a.getTime() - b.getTime());
  for (const point of points) {
    // `weekNo` is the week number, which is computed by taking the number of
    // weeks since `new Date(0)`. Because `new Date(0)` is Wednesday and we
    // consider the first day of the week to be Monday, the time must be subtracted
    // by four days when computing the week number.
    const weekStartOffset = 4 * DAY;
    const weekNo = Math.floor((point.x.getTime() - weekStartOffset) / WEEK);
    weekPoints[weekNo] = [...(weekPoints[weekNo] ?? []), point];
  }
  const sortedWeekPointPairs = Object.entries(weekPoints).sort(([wa], [wb]) => Number(wa) - Number(wb));
  return sortedWeekPointPairs.map(([_, currentWeekPoints]) => currentWeekPoints);
}
