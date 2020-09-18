import * as UserSessionsDataset from './user-sessions.dataset';
import { Dataset } from './types';

describe('UserSessionsDataset', () => {

  it('should return metas with empty config.', () => {
    const dataset: Dataset = UserSessionsDataset.create({});

    expect(dataset.metas.length).toBeGreaterThan(0);
  });
});
