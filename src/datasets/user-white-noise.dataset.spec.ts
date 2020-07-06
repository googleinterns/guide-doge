import * as UserWhiteNoiseDataset from './user-white-noise.dataset';
import { Dataset, Meta } from './types';
import { createDefault } from '../utils/preferences';
import { DAY } from '../utils/timeUnits';
import { DataCube } from '../models/data-cube/data-cube.model';

describe('UserWhiteNoiseDataset', () => {
  let dataset: Dataset;
  let currentTime: Date;

  beforeEach(() => {
    const config = createDefault(UserWhiteNoiseDataset.configMeta);
    dataset = UserWhiteNoiseDataset.create(config);
    currentTime = new Date();
  });

  it('should contain dataCube', () => {
    expect(dataset.dataCube).toBeInstanceOf(DataCube);
  });

  it('should query data points in date range', () => {
    const testMeta = (meta: Meta) => {
      if (meta.type === 'tabbed') {
        meta.metas.map(testMeta);
      } else {
        const testRanges: [Date, Date][] = [
          [new Date(currentTime.getTime() - 10 * DAY), new Date(currentTime.getTime() - 5 * DAY)],
          [new Date(currentTime.getTime() + 5 * DAY), new Date(currentTime.getTime() + 10 * DAY)],
          [new Date(currentTime.getTime()), new Date(currentTime.getTime())],
          [new Date(currentTime.getTime() + 1), new Date(currentTime.getTime() - 1)]
        ];

        for (const range of testRanges) {
          const data = meta.query({ range });
          for (const chart of data) {
            for (const point of chart.points) {
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
