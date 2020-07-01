import { DataService } from './data.service';
import { mockMeasureName } from '../../utils/mocks.spec';
import { Duration } from 'luxon';

describe('DataService', () => {
  let dataService: DataService;

  beforeEach(() => {
    dataService = new DataService();
  });

  it('should instantiate.', () => {
    expect(dataService).toBeInstanceOf(DataService);
  });

  it('should get data for the given days.', () => {
    for (const days of [7, 14, 30]) {
      const data = dataService.getMeasureOverDays(mockMeasureName, days);
      expect(data.length).toBe(days);
      const firstDate = data[0].date;
      const lastDate = data[data.length - 1].date;
      const actualDifference = lastDate.getTime() - firstDate.getTime();
      const expectedDifference = Duration.fromObject({ days: days - 1 }).as('milliseconds');
      expect(actualDifference).toBe(expectedDifference);
    }
  });
});
