import { DataService } from './data.service';
import { PreferenceService } from '../preference/preference.service';
import { createDefault } from '../../utils/preferences';
import * as UserWhiteNoiseDataset from '../../datasets/user-white-noise.dataset';
import * as DummyDataset from '../../datasets/dummy.dataset';

describe('DataService', () => {
  let dataService: DataService;
  let preferenceService: PreferenceService;

  beforeEach(() => {
    preferenceService = new PreferenceService();
    preferenceService.dataset$.next({
      ...preferenceService.dataset$.value,
      name: 'UserWhiteNoise'
    });
    dataService = new DataService(preferenceService);
  });

  it('should instantiate.', () => {
    expect(dataService).toBeInstanceOf(DataService);
  });

  it('should initialize dataset preference.', () => {
    expect(preferenceService.dataset$.value._meta)
      .toEqual(jasmine.objectContaining(UserWhiteNoiseDataset.configMeta));
    expect(preferenceService.dataset$.value)
      .toEqual(jasmine.objectContaining(createDefault(UserWhiteNoiseDataset.configMeta)));
  });

  it('should update dataset preference in PreferenceService when name is changed and valid.', () => {
    preferenceService.dataset$.next({
      ...preferenceService.dataset$.value,
      name: 'Dummy'
    });
    expect(preferenceService.dataset$.value._meta)
      .toEqual(jasmine.objectContaining(DummyDataset.configMeta));
    expect(preferenceService.dataset$.value)
      .toEqual(jasmine.objectContaining(createDefault(DummyDataset.configMeta)));
  });

  it('should not update dataset preference when name is invalid.', () => {
    preferenceService.dataset$.next({
      ...preferenceService.dataset$.value,
      name: 'INVALID_DATASET_NAME'
    });

    expect(preferenceService.dataset$.value._meta)
      .toEqual(jasmine.objectContaining(UserWhiteNoiseDataset.configMeta));
    expect(preferenceService.dataset$.value)
      .toEqual(jasmine.objectContaining(createDefault(UserWhiteNoiseDataset.configMeta)));
  });

  // TODO: Add tests for updating current dataset based on dataset preference
  // It should work with a mock dataset dependency and a spy on the exported create funciton of dataset module
});
