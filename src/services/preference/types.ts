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
