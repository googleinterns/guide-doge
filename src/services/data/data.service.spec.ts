import { DataService } from './data.service';
import { PreferenceService } from '../preference/preference.service';

describe('DataService', () => {
  let dataService: DataService;
  let preferenceService: PreferenceService;

  beforeEach(() => {
    preferenceService = new PreferenceService();
    dataService = new DataService(preferenceService);
  });

  it('should instantiate.', () => {
    expect(dataService).toBeInstanceOf(DataService);
  });
});
