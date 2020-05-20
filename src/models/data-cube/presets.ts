import { Category, Measure, MeasureType, Scope } from './types';

export const countryCategory: Category = {
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
};

export const browserCategory: Category = {
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
};

export const sourceCategory: Category = {
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
};

export const activeUserMeasure: Measure = {
  name: 'activeUsers',
  scope: Scope.USER,
  type: MeasureType.COUNT,
};

export const revenueMeasure: Measure = {
  name: 'revenue',
  scope: Scope.EVENT,
  type: MeasureType.SUM,
  range: [0, 10],
};

export const eventCountMeasure: Measure = {
  name: 'eventCount',
  scope: Scope.EVENT,
  type: MeasureType.SUM,
};
