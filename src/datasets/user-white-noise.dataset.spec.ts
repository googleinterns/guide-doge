import * as UserWhiteNoiseDataset from './user-white-noise.dataset';
import { Dataset } from './types';
import { createDefault } from '../utils/preferences';
import { DAY } from '../utils/timeUnits';
import { DataCube } from '../models/data-cube/data-cube.model';
import { Meta } from './metas/types';

describe('UserWhiteNoiseDataset', () => {
  let dataset: Dataset;
  let currentTime: number;

  beforeEach(() => {
    const config = createDefault(UserWhiteNoiseDataset.configMeta);
    dataset = UserWhiteNoiseDataset.create(config);
    currentTime = Date.now();
  });

  it('should contain dataCube.', () => {
    expect(dataset.dataCube).toBeInstanceOf(DataCube);
  });

  it('should query data points in date range.', () => {
    const testMeta = (meta: Meta) => {
      if (meta.type === 'tabbed') {
        meta.metas.map(testMeta);
      } else if (meta.type === 'line') {
        const testRanges: [Date, Date][] = [
          [new Date(currentTime - 10 * DAY), new Date(currentTime - 5 * DAY)],
          [new Date(currentTime + 5 * DAY), new Date(currentTime + 10 * DAY)],
          [new Date(currentTime), new Date(currentTime)],
          [new Date(currentTime + 1), new Date(currentTime - 1)],
        ];

        for (const range of testRanges) {
          const data = meta.queryData({ range });
          for (const datum of data) {
            for (const point of datum.points) {
              expect(point.x > range[0]).toBeTrue();
              expect(point.x <= range[1]).toBeTrue();
            }
          }
        }
      } else {
        throw new Error(`Unexpected meta type '${meta.type}'.`);
      }
    };

    dataset.metas.map(testMeta);
  });
});
