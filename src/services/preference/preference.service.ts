import { BehaviorSubject } from 'rxjs';
import * as Cookies from 'js-cookie';
import {
  AudificationPreference,
  DatasetPreference,
  DataTablePreference,
  GeoMapNavigationPreference,
  LayoutPreference,
  Preference,
  PreferenceMeta,
  PreferenceWithMeta,
  SelectPreferenceItemMeta,
  SummarizationPreference,
} from './types';
import { createDefault } from '../../utils/preferences';
import { datasets } from '../../datasets';

export class PreferenceService {
  dataset$ = this.createPreference<DatasetPreference>({
    enabled: {
      type: 'boolean',
      defaultValue: true,
    },
    name: {
      type: 'select',
      defaultValue: Object.keys(datasets)[0],
      options: Object.keys(datasets),
    },
  }, 'dataset');

  layout$ = this.createPreference<LayoutPreference>({
    enabled: {
      type: 'boolean',
      defaultValue: true,
    },
    cardWidth: {
      type: 'select',
      defaultValue: '800px',
      options: ['800px', '700px', '600px', '500px'],
    },
  }, 'layout');

  audification$ = this.createPreference<AudificationPreference>({
    enabled: {
      type: 'boolean',
      defaultValue: true,
    },
    lowestPitch: {
      type: 'number',
      defaultValue: 256,
    },
    highestPitch: {
      type: 'number',
      defaultValue: 1024,
    },
    noteDuration: {
      type: 'number',
      defaultValue: 167,
    },
    readBefore: {
      type: 'boolean',
      defaultValue: false,
    },
    readAfter: {
      type: 'boolean',
      defaultValue: true,
    },
  }, 'audification');

  dataTable$ = this.createPreference<DataTablePreference>({
    enabled: {
      type: 'boolean',
      defaultValue: true,
    },
  }, 'data_table');

  summarization$ = this.createPreference<SummarizationPreference>({
    enabled: {
      type: 'boolean',
      defaultValue: true,
    },
    validityThreshold: {
      type: 'number',
      defaultValue: 0.5,
    },
  }, 'summarization');

  geoMapNavigation$ = this.createPreference<GeoMapNavigationPreference>({
    enabled: {
      type: 'boolean',
      defaultValue: true,
    },
  }, 'geo_map_navigation');

  private createPreference<T extends Preference>(preferenceMeta: PreferenceMeta<T>, cookieKeySuffix: string) {
    const defaultPreference = createDefault(preferenceMeta);

    const cookieKey = `a11y-preference-${cookieKeySuffix}`;
    const loadedPreference = {
      ...defaultPreference,
      ...this.loadPreference<T>(cookieKey),
    };

    // make sure the loaded preference object conforms to type T
    const keys = Object.keys(loadedPreference) as (keyof T)[];
    for (const key of keys) {
      if (!(key in preferenceMeta)) {
        delete loadedPreference[key];
        continue;
      }

      const expectedMeta = preferenceMeta[key];
      const actualType = typeof loadedPreference[key];

      // in case of type mismatch, override with the default value
      if (expectedMeta.type === 'select') {
        const loadedValue = loadedPreference[key];
        const expectedOptions = (expectedMeta as SelectPreferenceItemMeta).options;

        if (actualType !== 'string' || !expectedOptions.includes(loadedValue as any)) {
          loadedPreference[key] = defaultPreference[key];
        }
      } else if (actualType !== expectedMeta.type) {
        loadedPreference[key] = defaultPreference[key];
      }
    }

    const preferenceWithMeta = {
      ...loadedPreference,
      _meta: preferenceMeta,
    };

    const preference$ = new BehaviorSubject<PreferenceWithMeta<T>>(preferenceWithMeta);
    preference$.subscribe(({ _meta, ...preference }) => {
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
