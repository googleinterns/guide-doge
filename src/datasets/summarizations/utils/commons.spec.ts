import { cacheSummaries, combineQuerySummariesFactories } from './commons';
import { Summary } from '../types';

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
