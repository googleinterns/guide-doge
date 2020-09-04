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
  const points = [
    { x: 10, y: 10 },
    { x: 12, y: 12 },
    { x: 15, y: 15 },
    { x: 20, y: 20 },
  ];

  it('should take min and max x-values of input for normalization by default.', () => {
    expect(normalizePointsX(points)).toEqual([
      { x: 0, y: 10 },
      { x: 0.2, y: 12 },
      { x: 0.5, y: 15 },
      { x: 1.0, y: 20 },
    ]);
  });

  it('should use chart x-axis min limit for normalization if provided.', () => {
    expect(normalizePointsX(points, { min: 0 })).toEqual([
      { x: 0.5, y: 10 },
      { x: 0.6, y: 12 },
      { x: 0.75, y: 15 },
      { x: 1.0, y: 20 },
    ]);
  });

  it('should use chart x-axis max limit for normalization if provided.', () => {
    expect(normalizePointsX(points, { max: 30 })).toEqual([
      { x: 0, y: 10 },
      { x: 0.1, y: 12 },
      { x: 0.25, y: 15 },
      { x: 0.5, y: 20 },
    ]);
  });

  it('should use chart x-axis limits for normalization if provided.', () => {
    expect(normalizePointsX(points, { min: 0, max: 100 })).toEqual([
      { x: 0.1, y: 10 },
      { x: 0.12, y: 12 },
      { x: 0.15, y: 15 },
      { x: 0.2, y: 20 },
    ]);
  });
});


describe('normalizePointsY', () => {
  const chartYXSizeRatio = 500 / 800;
  const points = [
    { x: 10, y: 10 },
    { x: 12, y: 12 },
    { x: 15, y: 15 },
    { x: 20, y: 20 },
  ];

  it('should take 0 as min and max y-values of input for normalization by default.', () => {
    expect(normalizePointsY(points)).toEqual([
      { x: 10, y: 0.5 * chartYXSizeRatio },
      { x: 12, y: 0.6 * chartYXSizeRatio },
      { x: 15, y: 0.75 * chartYXSizeRatio },
      { x: 20, y: 1.0 * chartYXSizeRatio },
    ]);
  });

  it('should use chart y-axis min limit for normalization if provided.', () => {
    expect(normalizePointsY(points, { min: 10 })).toEqual([
      { x: 10, y: 0 * chartYXSizeRatio },
      { x: 12, y: 0.2 * chartYXSizeRatio },
      { x: 15, y: 0.5 * chartYXSizeRatio },
      { x: 20, y: 1.0 * chartYXSizeRatio },
    ]);
  });

  it('should use chart y-axis max limit for normalization if provided.', () => {
    expect(normalizePointsY(points, { max: 40 })).toEqual([
      { x: 10, y: 0.25 * chartYXSizeRatio },
      { x: 12, y: 0.3 * chartYXSizeRatio },
      { x: 15, y: 0.375 * chartYXSizeRatio },
      { x: 20, y: 0.5 * chartYXSizeRatio },
    ]);
  });

  it('should use chart y-axis limits for normalization if provided.', () => {
    expect(normalizePointsY(points, { min: 0, max: 100 })).toEqual([
      { x: 10, y: 0.1 * chartYXSizeRatio },
      { x: 12, y: 0.12 * chartYXSizeRatio },
      { x: 15, y: 0.15 * chartYXSizeRatio },
      { x: 20, y: 0.2 * chartYXSizeRatio },
    ]);
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
    expect(normalizePoints(points)).toEqual(normalizePointsX(normalizePointsY(points)));
    expect(normalizePoints(points)).toEqual(normalizePointsY(normalizePointsX(points)));
  });

  it('should normalize x-values and y-values based on chart xlim and ylim.', () => {
    const xlim = { min: 0, max: 100 };
    const ylim = { min: 10, max: 40 };

    expect(normalizePoints(points, xlim, ylim)).toEqual(normalizePointsX(normalizePointsY(points, ylim), xlim));
    expect(normalizePoints(points, xlim, ylim)).toEqual(normalizePointsY(normalizePointsX(points, xlim), ylim));
  });
});
