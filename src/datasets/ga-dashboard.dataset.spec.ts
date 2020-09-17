import * as GADashboardDataset from './ga-dashboard.dataset';
import { Dataset } from './types';
import { createDefault } from '../utils/preferences';
import { DAY } from '../utils/timeUnits';
import { DataCube } from '../models/data-cube/data-cube.model';
import { Meta, MetaType } from './metas/types';

describe('GADashboardDataset', () => {
  let dataset: Dataset;
  let currentTime: number;

  beforeEach(() => {
    const config = createDefault(GADashboardDataset.configMeta);
    dataset = GADashboardDataset.create(config);
    currentTime = Date.now();
  });

  it('should query data points.', () => {
    const testMeta = (meta: Meta) => {
      if (meta.type === MetaType.BAR_CHART || meta.type === MetaType.PIE_CHART) {
        const points = meta.queryData({});
        expect(points.length).toBeGreaterThan(0);
      } else if (meta.type === MetaType.LINE_CHART) {
        const points = meta.queryData({ range: [new Date(), new Date()] });
        expect(points.length).toBeGreaterThan(0);
      } else {
        throw new Error(`Unexpected meta type '${meta.type}'.`);
      }
    };

    dataset.metas.map(testMeta);
  });
});
