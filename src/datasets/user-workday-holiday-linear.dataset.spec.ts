import * as UserWorkdayHolidayLinearDataset from './user-workday-holiday-linear.dataset';
import { Dataset } from './types';
import { createDefault } from '../utils/preferences';
import { DAY } from '../utils/timeUnits';
import { DataCube } from '../models/data-cube/data-cube.model';
import { Meta, MetaType } from './metas/types';

describe('UserWorkdayHolidayLinearDataset', () => {
  let dataset: Dataset;
  let currentTime: number;

  beforeEach(() => {
    const config = createDefault(UserWorkdayHolidayLinearDataset.configMeta);
    dataset = UserWorkdayHolidayLinearDataset.create(config);
    currentTime = Date.now();
  });

  it('should contain dataCube.', () => {
    expect(dataset.dataCube).toBeInstanceOf(DataCube);
  });

  it('should query data points in date range.', () => {
    const testMeta = (meta: Meta) => {
      if (meta.type === MetaType.TABBED_CHARTS) {
        meta.metas.map(testMeta);
      } else if (meta.type === MetaType.LINE_CHART) {
        const testRanges: [Date, Date][] = [
          [new Date(currentTime - 10 * DAY), new Date(currentTime - 5 * DAY)],
          [new Date(currentTime + 5 * DAY), new Date(currentTime + 10 * DAY)],
          [new Date(currentTime), new Date(currentTime)],
          [new Date(currentTime + 1), new Date(currentTime - 1)]
        ];

        for (const range of testRanges) {
          const data = meta.queryData({ range });
          for (const datum of data.data) {
            for (const point of datum.points) {
              expect(point.x > range[0]).toBeTrue();
              expect(point.x <= range[1]).toBeTrue();
            }
          }
        }
      }
    };

    dataset.metas.map(testMeta);
  });
});
