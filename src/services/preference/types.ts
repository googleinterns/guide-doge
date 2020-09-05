import * as UserWhiteNoiseDataset from '../../datasets/user-white-noise.dataset';
import * as DummyDataset from '../../datasets/dummy.dataset';
import * as VRScatterplotDataset from '../../datasets/vr-scatterplot.dataset';
import * as VRScatterplot2Dataset from '../../datasets/vr-scatterplot2.dataset';


export interface Preference {
  enabled: boolean;
}

export type PreferenceWithMeta<T extends Preference> = T & {
  _meta: PreferenceMeta<T>;
  _meta_name?: string;
};

export interface AudificationPreference extends Preference {
  lowestPitch: number;
  highestPitch: number;
  noteDuration: number;
  readBefore: boolean;
  readAfter: boolean;
}

export type DataTablePreference = Preference;

export type GeoMapNavigationPreference = Preference;

export interface SummarizationPreference extends Preference {
  validityThreshold: number;
}

export type PreferenceMeta<T> = {
  [K in keyof T]: PreferenceItemMeta;
};

export type DatasetPreference =
  UserWGNDatasetPreference | DummyDatasetPreference |
  VRScatterplotPreference | VRScatterplot2Preference |BaseDatasetPreference<string, Preference>;

export type BaseDatasetPreference<T extends string, U> = { name: T } & U;

export type UserWGNDatasetPreference = BaseDatasetPreference<'UserWhiteNoiseDataset', UserWhiteNoiseDataset.Config & Preference>;
export type DummyDatasetPreference = BaseDatasetPreference<'DummyDataset', DummyDataset.Config & Preference>;
export type VRScatterplotPreference = BaseDatasetPreference<'VRScatterplotDataset', VRScatterplotDataset.Config & Preference>;
export type VRScatterplot2Preference = BaseDatasetPreference<'VRScatterplotDataset2', VRScatterplot2Dataset.Config & Preference>;


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

