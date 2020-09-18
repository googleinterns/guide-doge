import * as TimeActiveUsersDataset from './time-active-users.dataset';
import { Dataset } from './types';
import { createDefault } from '../utils/preferences';
import { DAY } from '../utils/timeUnits';
import { Meta, MetaType } from './metas/types';

describe('TimeActiveUsersDataset', () => {
  let dataset: Dataset;
  let currentTime: number;

  beforeEach(() => {
    const config = createDefault(TimeActiveUsersDataset.configMeta);
    dataset = TimeActiveUsersDataset.create(config);
    currentTime = Date.now();
  });

  it('should query data points.', () => {
    const testMeta = (meta: Meta) => {
      if (meta.type === MetaType.LINE_CHART) {
        const points = meta.queryData({ range: [new Date(), new Date()] });
        expect(points.length).toBeGreaterThan(0);
      } else {
        throw new Error(`Unexpected meta type '${meta.type}'.`);
      }
    };

    dataset.metas.map(testMeta);
  });
});
