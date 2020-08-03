import { groupPointsByXWeek } from './time-series';

describe('groupPointsByXWeek', () => {
  const points = [
    { x: new Date(2020, 6, 4), y: 1 },
    { x: new Date(2020, 6, 5), y: 2 },
    { x: new Date(2020, 6, 6), y: 3 },
    { x: new Date(2020, 6, 7), y: 4 },
    { x: new Date(2020, 6, 14), y: 8 },
    { x: new Date(2020, 6, 13), y: 7 },
    { x: new Date(2020, 6, 12), y: 6 },
    { x: new Date(2020, 6, 11), y: 5 },
  ];

  it('should group points by week number.', () => {
    const groupedPoints = groupPointsByXWeek(points);
    expect(groupedPoints).toEqual([
      [
        { x: new Date(2020, 6, 4), y: 1 },
        { x: new Date(2020, 6, 5), y: 2 },
      ],
      [
        { x: new Date(2020, 6, 6), y: 3 },
        { x: new Date(2020, 6, 7), y: 4 },
        { x: new Date(2020, 6, 11), y: 5 },
        { x: new Date(2020, 6, 12), y: 6 }
      ],
      [
        { x: new Date(2020, 6, 13), y: 7 },
        { x: new Date(2020, 6, 14), y: 8 },
      ],
    ]);
  });
});
