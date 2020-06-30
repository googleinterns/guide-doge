import { UserWGNDatasetConfig } from '../../datasets/user-wgn.dataset';

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

type UserWGNDatasetPreference = UserWGNDatasetConfig & Preference;

export type DatasetPreference = UserWGNDatasetPreference;
