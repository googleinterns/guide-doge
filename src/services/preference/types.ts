import * as UserWhiteNoiseDataset from '../../datasets/user-white-noise.dataset';


export interface Preference {
  enabled: boolean;
}

export type PreferenceWithMeta<T extends Preference> = T & { _meta: PreferenceMeta<T> };

export interface AudificationPreference extends Preference {
  lowestPitch: number;
  highestPitch: number;
  noteDuration: number;
  readBefore: boolean;
  readAfter: boolean;
}

export type DataTablePreference = Preference;

export type TextSummaryPreference = Preference;

type UserWGNDatasetPreference = UserWhiteNoiseDataset.Config & Preference;

export type DatasetPreference = UserWGNDatasetPreference;

export type PreferenceMeta<T> = {
  [K in keyof T]: PreferenceItemMeta;
};

export type PreferenceItemMeta = NumberPreferenceItemMeta | BoolPreferenceItemMeta | SelectPreferenceItemMeta;

export interface BasePreferenceItemMeta<TS extends string, T> {
  type: TS;
  defaultValue: T;
}

export type NumberPreferenceItemMeta = BasePreferenceItemMeta<'number', number>;

export type BoolPreferenceItemMeta = BasePreferenceItemMeta<'boolean', boolean>;

export interface SelectPreferenceItemMeta extends BasePreferenceItemMeta<'select', string> {
  options: string[];
}
