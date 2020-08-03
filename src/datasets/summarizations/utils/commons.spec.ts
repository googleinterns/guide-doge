import {
  cacheSummaries,
  combineQuerySummariesFactories,
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


