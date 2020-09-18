import { SummarizationDataSourceService } from './summarization-data-source.service';

describe('SummarizationControlService', () => {
  let summarizationDataSourceService: SummarizationDataSourceService;

  const mockData = [
    {
      label: 'Datum 0',
      points: [{ x: new Date(), y: 10 }, { x: new Date(), y: 20 }],
    },
    {
      label: 'Datum 1',
      points: [{ x: new Date(), y: 100 }, { x: new Date(), y: 200 }],
    },
  ];

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    summarizationDataSourceService.data$.next(mockData);
  });

  it('should instantiate.', () => {
    expect(summarizationDataSourceService).toBeInstanceOf(SummarizationDataSourceService);
  });

  it('should get points by datum label.', done => {
    summarizationDataSourceService.pointsByLabels$(['Datum 0']).subscribe(pointsArray => {
      expect(pointsArray.length).toBe(1);
      expect(pointsArray).toEqual([mockData[0].points]);
      done();
    });
  });

  it('should get points by datum labels.', done => {
    summarizationDataSourceService.pointsByLabels$(['Datum 0', 'Datum 1']).subscribe(pointsArray => {
      expect(pointsArray.length).toBe(2);
      expect(pointsArray).toEqual([mockData[0].points, mockData[1].points]);
      done();
    });
  });

  it('should return empty array when datum label does not exist.', done => {
    summarizationDataSourceService.pointsByLabels$(['Datum 2']).subscribe(pointsArray => {
      expect(pointsArray.length).toBe(0);
      done();
    });
  });
});

