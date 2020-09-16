import { TimeSeriesPoint } from '../../../datasets/metas/types';
import { DAY, WEEK } from '../../../utils/timeUnits';

/**
 * Group time-series points by the week number of their x-values (date).
 * The first day of the week is Monday when computing the week number of
 * a date.
 *
 * For example, let the parameter `points` be:
 * ```
 * points = [
 *   { x: new Date('2020-7-19'), y: 1},
 *   { x: new Date('2020-7-21'), y: 3},
 *   { x: new Date('2020-7-20'), y: 2},
 * ];
 * ```
 * the return will be:
 * ```
 * [
 *   [{ x: new Date('2020-7-19'), y: 1}],
 *   [{ x: new Date('2020-7-20'), y: 2}, { x: new Date('2020-7-21'), y: 3}]
 * ]
 * ```
 * where points with x-values (date) in the same week are sorted and placed in
 * the same subarray in the return.
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
    const weekNo = getWeekNumber(point.x);
    weekPoints[weekNo] = [...(weekPoints[weekNo] ?? []), point];
  }
  const sortedWeekPointPairs = Object.entries(weekPoints).sort(([wa], [wb]) => Number(wa) - Number(wb));
  return sortedWeekPointPairs.map(([_, currentWeekPoints]) => currentWeekPoints);
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / DAY) + 1) / 7);

  return weekNo;
}

export function timeSeriesPointToNumPoint(point: TimeSeriesPoint) {
  return {
    x: point.x.getTime() / DAY,
    y: point.y,
  };
}

