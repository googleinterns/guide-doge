import {Category, Measure, Scope, MeasureType} from './datagen/types';

export const categories: Category[] = [
  {
    name: 'country',
    values: [
      {
        name: 'Canada',
        weight: 2,
      },
      {
        name: 'USA',
        weight: 16,
      },
      {
        name: 'Mexico',
        weight: 15,
      },
    ],
  },
  {
    name: 'browser',
    values: [
      {
        name: 'Chrome',
        weight: 50,
      },
      {
        name: 'Firefox',
        weight: 19,
      },
      {
        name: 'Safari',
        weight: 20,
      },
      {
        name: 'Edge',
        weight: 10,
      },
    ],
  },
  {
    name: 'source',
    values: [
      {
        name: 'Direct',
        weight: 5,
      },
      {
        name: 'Email',
        weight: 5,
      },
    ],
  },
];

export const measures: Measure[] = [
  {
    name: 'activeUsers',
    scope: Scope.USER,
    type: MeasureType.COUNT,
  },
  {
    name: 'revenue',
    scope: Scope.EVENT,
    type: MeasureType.SUM,
    range: [0, 10],
  },
  {
    name: 'eventCount',
    scope: Scope.EVENT,
    type: MeasureType.SUM,
  },
];
