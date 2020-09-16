import {
  cacheSummaries,
  combineQuerySummariesFactories,
  normalizePoints,
  normalizePointsX,
  normalizePointsY,
  pairToPoint,
  pointToPair,
} from './commons';
import { Summary } from '../types';
import { XYPoint } from 'src/datasets/metas/types';

describe('cacheSummaries', () => {
  const summaries: Summary[] = [
    { text: 's1', validity: 0.5 },
    { text: 's2', validity: 0.5 },
    { text: 's3', validity: 0.5 },
  ];
  let querySummariesSpy;
  let cachedQuerySummaries;

  beforeEach(() => {
    querySummariesSpy = jasmine.createSpy().and.returnValue(summaries);
    cachedQuerySummaries = cacheSummaries(querySummariesSpy);
  });

  it('should create query summaries function.', () => {
    expect(cachedQuerySummaries).toEqual(jasmine.any(Function));
  });

  describe('return', () => {
    it('should cache summaries.', () => {
      cachedQuerySummaries();
      expect(querySummariesSpy).toHaveBeenCalledTimes(1);
      cachedQuerySummaries();
      expect(querySummariesSpy).toHaveBeenCalledTimes(1);
      cachedQuerySummaries();
      expect(querySummariesSpy).toHaveBeenCalledTimes(1);
    });

    it('should return same summaries as original query function.', () => {
      expect(cachedQuerySummaries()).toEqual(summaries);
      expect(cachedQuerySummaries()).toEqual(summaries);
      expect(cachedQuerySummaries()).toEqual(summaries);
    });
  });
});

describe('combineQuerySummariesFactories', () => {
  const summariesArrays: Summary[][] = [
    [
      { text: 's1', validity: 0.5 },
      { text: 's2', validity: 0.5 },
    ],
    [
      { text: 's3', validity: 0.5 },
      { text: 's4', validity: 0.5 },
    ],
  ];
  const summariesQueries = summariesArrays.map(summaries => () => summaries);
  let querySummariesFactories;
  let combinedQuerySummariesFactories;

  beforeEach(() => {
    querySummariesFactories = summariesQueries.map(summaryQuery => jasmine.createSpy().and.returnValue(summaryQuery));
    combinedQuerySummariesFactories = combineQuerySummariesFactories(...querySummariesFactories);
  });

  it('should create query summaries factory.', () => {
    expect(combinedQuerySummariesFactories).toEqual(jasmine.any(Function));
    expect(combinedQuerySummariesFactories()).toEqual(jasmine.any(Function));
  });

  describe('return', () => {
    it('should concatenate summaries.', () => {
      const concatSummaries = ([] as Summary[]).concat(...summariesArrays);
      expect(combinedQuerySummariesFactories()()).toEqual(concatSummaries);
    });
  });
});

describe('pairToPoint', () => {
  it('should create point from pair.', () => {
    expect(pairToPoint([1, 1])).toEqual({ x: 1, y: 1 });
    expect(pairToPoint([2, 1])).toEqual({ x: 2, y: 1 });
  });
});

describe('pointToPair', () => {
  it('should create pair from point.', () => {
    expect(pointToPair({ x: 1, y: 1 })).toEqual([1, 1]);
    expect(pointToPair({ x: 2, y: 1 })).toEqual([2, 1]);
  });
});

describe('normalizePointsX', () => {
  const chartXYSizeRatio = 800 / 500;
  const points = [
    { x: 10, y: 10 },
    { x: 12, y: 12 },
    { x: 15, y: 15 },
    { x: 20, y: 20 },
  ];

  it('should take min and max x-values of input for normalization by default.', () => {
    const expectedResult = [
      { x: 0 * chartXYSizeRatio, y: 10 },
      { x: 0.2 * chartXYSizeRatio, y: 12 },
      { x: 0.5 * chartXYSizeRatio, y: 15 },
      { x: 1.0 * chartXYSizeRatio, y: 20 },
    ];
    const normalizedXPoints = normalizePointsX(points);

    expect(normalizedXPoints.length).toBe(points.length);
    normalizedXPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });

  it('should use chart x-axis min limit for normalization if provided.', () => {
    const expectedResult = [
      { x: 0.5 * chartXYSizeRatio, y: 10 },
      { x: 0.6 * chartXYSizeRatio, y: 12 },
      { x: 0.75 * chartXYSizeRatio, y: 15 },
      { x: 1.0 * chartXYSizeRatio, y: 20 },
    ];
    const normalizedXPoints = normalizePointsX(points, { min: 0 });

    expect(normalizedXPoints.length).toBe(points.length);
    normalizedXPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });

  it('should use chart x-axis max limit for normalization if provided.', () => {
    const expectedResult = [
      { x: 0 * chartXYSizeRatio, y: 10 },
      { x: 0.1 * chartXYSizeRatio, y: 12 },
      { x: 0.25 * chartXYSizeRatio, y: 15 },
      { x: 0.5 * chartXYSizeRatio, y: 20 },
    ];
    const normalizedXPoints = normalizePointsX(points, { max: 30 });

    expect(normalizedXPoints.length).toBe(points.length);
    normalizedXPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });

  it('should use chart x-axis limits for normalization if provided.', () => {
    const expectedResult = [
      { x: 0.1 * chartXYSizeRatio, y: 10 },
      { x: 0.12 * chartXYSizeRatio, y: 12 },
      { x: 0.15 * chartXYSizeRatio, y: 15 },
      { x: 0.2 * chartXYSizeRatio, y: 20 },
    ];
    const normalizedXPoints = normalizePointsX(points, { min: 0, max: 100 });

    expect(normalizedXPoints.length).toBe(points.length);
    normalizedXPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });
});


describe('normalizePointsY', () => {
  const points = [
    { x: 10, y: 10 },
    { x: 12, y: 12 },
    { x: 15, y: 15 },
    { x: 20, y: 20 },
  ];

  it('should take 0 as min and max y-values of input for normalization by default.', () => {
    const expectedResult = [
      { x: 10, y: 0.5 },
      { x: 12, y: 0.6 },
      { x: 15, y: 0.75 },
      { x: 20, y: 1.0 },
    ];
    const normalizedYPoints = normalizePointsY(points);

    expect(normalizedYPoints.length).toBe(points.length);
    normalizedYPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });

  it('should use chart y-axis min limit for normalization if provided.', () => {
    const expectedResult = [
      { x: 10, y: 0 },
      { x: 12, y: 0.2 },
      { x: 15, y: 0.5 },
      { x: 20, y: 1.0 },
    ];
    const normalizedYPoints = normalizePointsY(points, { min: 10 });

    expect(normalizedYPoints.length).toBe(points.length);
    normalizedYPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });

  it('should use chart y-axis max limit for normalization if provided.', () => {
    const expectedResult = [
      { x: 10, y: 0.25 },
      { x: 12, y: 0.3 },
      { x: 15, y: 0.375 },
      { x: 20, y: 0.5 },
    ];
    const normalizedYPoints = normalizePointsY(points, { max: 40 });

    expect(normalizedYPoints.length).toBe(points.length);
    normalizedYPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });

  it('should use chart y-axis limits for normalization if provided.', () => {
    const expectedResult = [
      { x: 10, y: 0.1 },
      { x: 12, y: 0.12 },
      { x: 15, y: 0.15 },
      { x: 20, y: 0.2 },
    ];
    const normalizedYPoints = normalizePointsY(points, { min: 0, max: 100 });

    expect(normalizedYPoints.length).toBe(points.length);
    normalizedYPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });
});


describe('normalizePoints', () => {
  const points = [
    { x: 10, y: 10 },
    { x: 12, y: 12 },
    { x: 15, y: 15 },
    { x: 20, y: 20 },
  ];

  it('should normalize x-values and y-values.', () => {
    const expectedResult = normalizePointsX(normalizePointsY(points));
    const normalizeYPoints = normalizePoints(points);

    expect(normalizeYPoints.length).toBe(points.length);
    normalizeYPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });

  it('should normalize x-values and y-values based on chart xlim and ylim.', () => {
    const xlim = { min: 0, max: 100 };
    const ylim = { min: 10, max: 40 };

    const expectedResult = normalizePointsX(normalizePointsY(points, ylim), xlim);
    const normalizeYPoints = normalizePoints(points, xlim, ylim);

    expect(normalizeYPoints.length).toBe(points.length);
    normalizeYPoints.map((point, i) => {
      expect(point.x).toBeCloseTo(expectedResult[i].x, 4);
      expect(point.y).toBeCloseTo(expectedResult[i].y, 4);
    });
  });
});
