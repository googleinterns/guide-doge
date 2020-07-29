import * as VRScatterplotDataset from './vr-scatterplot.dataset';
import { Dataset } from './types';
import { createDefault } from '../utils/preferences';
import { MetaType } from './metas/types';
import { DataCube } from '../models/data-cube/data-cube.model';

describe('VRScatterplot Dataset', () => {
  let dataset: Dataset;

  beforeEach(() => {
    const config = createDefault(VRScatterplotDataset.configMeta);
    dataset = VRScatterplotDataset.create(config);
  });
  it('should contain dataCube.', () => {
    expect(dataset.dataCube).toBeInstanceOf(DataCube);
  });
  it('should contain one scatter_plot meta.', () => {
    expect(dataset.metas.some(meta => meta.type === MetaType.SCATTER_PLOT)).toBeTrue();
  });
});
