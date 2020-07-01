import * as UserWhiteNoiseDataset from '../../datasets/user-white-noise.dataset';

export interface Preference {
  enabled: boolean;
}

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
