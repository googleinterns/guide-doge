import { groupPointsByXWeek } from './time-series';

describe('groupPointsByXWeek', () => {
  let points;
  let groupedPoints;

  beforeEach(() => {
    points = [];
    for (let i = 1; i <= 31; i++) {
      points.push({
        x: new Date(2020, 6, i),
        y: i,
      });
    }
    for (let i = 31; i >= 1; i--) {
      points.push({
        x: new Date(2020, 7, i),
        y: i,
      });
    }

    groupedPoints = groupPointsByXWeek(points);
  });

  it('should not return empty points array.', () => {
    for (const weekPoints of groupedPoints) {
      expect(weekPoints).not.toEqual([]);
    }
  });

  it('should group points by week number.', () => {
    for (const weekPoints of groupedPoints) {
      const weekStart = getWeekStart(weekPoints[0].x);
      for (const point of weekPoints) {
        expect(getWeekStart(point.x)).toEqual(weekStart);
      }
    }
  });

  it('should sort week points by week number in ascending order.', () => {
    for (let i = 1; i < groupedPoints.length; i++) {
      const currentWeekStart = getWeekStart(groupedPoints[i][0].x);
      const previousWeekStart = getWeekStart(groupedPoints[i - 1][0].x);
      expect(currentWeekStart.getTime()).toBeGreaterThan(previousWeekStart.getTime());
    }
  });

  it('should sort points by date in ascending order', () => {
    for (const weekPoints of groupedPoints) {
      for (let j = 1; j < weekPoints.length; j++) {
        const currentPointDate = weekPoints[j].x;
        const previousPointDate = weekPoints[j - 1].x;
        expect(currentPointDate.getTime()).toBeGreaterThanOrEqual(previousPointDate.getTime());
      }
    }
  });
});

function getWeekStart(date) {
  const weekStart = new Date(date);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 6) % 7); // First day of the week is Monday
  return weekStart;
}
