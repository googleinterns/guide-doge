import { BehaviorSubject } from 'rxjs';
import * as Cookies from 'js-cookie';
import { AudificationPreference, DataTablePreference, Preference, TextSummaryPreference } from './types';

export class PreferenceService {
  audification$ = this.createPreference<AudificationPreference>({
    enabled: true,
    lowestPitch: 256,
    highestPitch: 1024,
    noteDuration: 167,
    readBefore: false,
    readAfter: true,
  }, 'audification');

  dataTable$ = this.createPreference<DataTablePreference>({
    enabled: true,
    placeholder: null,
  }, 'data_table');

  textSummary$ = this.createPreference<TextSummaryPreference>({
    enabled: true,
    placeholder: null,
  }, 'text_summary');

  private createPreference<T extends Preference>(defaultPreference: T, cookieKeySuffix: string) {
    const cookieKey = `a11y-preference-${cookieKeySuffix}`;
    const loadedPreference = {
      ...defaultPreference,
      ...this.loadPreference<T>(cookieKey),
    };

    // make sure the loaded preference object conforms to type T
    const keys = Object.keys(defaultPreference) as (keyof T)[];
    for (const key of keys) {
      const expectedType = typeof defaultPreference[key];
      const actualType = typeof loadedPreference[key];

      // in case of type mismatch, override with the default value
      if (actualType !== expectedType) {
        loadedPreference[key] = defaultPreference[key];
      }
    }

    const preference$ = new BehaviorSubject<T>(loadedPreference);
    preference$.subscribe(preference => {
      this.savePreference(cookieKey, preference);
    });
    return preference$;
  }

  // later in the production, it should be loaded from the server
  private loadPreference<T extends Preference>(cookieKey: string): Partial<T> {
    const cookie = Cookies.get(cookieKey);
    if (!cookie) {
      return {};
    }
    try {
      return JSON.parse(cookie);
    } catch (e) {
      console.error('Error occurred while parsing the cookie:', e);
    }
    return {};
  }

  private savePreference<T extends Preference>(cookieKey: string, preference: T) {
    Cookies.set(cookieKey, preference);
  }
}
