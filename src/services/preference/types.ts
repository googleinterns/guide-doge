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

export interface DataTablePreference extends Preference {
  placeholder: unknown; // to disable no-empty-interface TSLint error
}

export interface TextSummaryPreference extends Preference {
  placeholder: unknown;
}

type UserWGNDatasetPreference = UserWhiteNoiseDataset.Config & Preference;

export type DatasetPreference = UserWGNDatasetPreference;
