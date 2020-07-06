import { PreferenceService } from './preference.service';
import { Observable } from 'rxjs';

describe('PreferenceService', () => {
  let preferenceService: PreferenceService;

  beforeEach(() => {
    preferenceService = new PreferenceService();
  });

  it('should instantiate.', () => {
    expect(preferenceService).toBeInstanceOf(PreferenceService);
  });

  it('should have combined observable preferences.', done => {
    expect(preferenceService.audification$).toBeInstanceOf(Observable);
    preferenceService.audification$.subscribe(audificationPreference => {
      Object.values(audificationPreference).forEach(value => {
        expect(value).not.toBeInstanceOf(Observable);
      });
      done();
    });
  });
});
