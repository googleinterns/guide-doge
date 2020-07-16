import * as GeographicDataset from './geographic.dataset';
import { Dataset } from './types';
import { createDefault } from '../utils/preferences';

describe('GeographicDataset', () => {
  let dataset: Dataset;

  beforeEach(() => {
    const config = createDefault(GeographicDataset.configMeta);
    dataset = GeographicDataset.create(config);
  });

  it('should contain at least one geo-map meta.', () => {
    expect(dataset.metas.some(meta => meta.type === 'geo-map')).toBeTrue();
  });
});
