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

export interface DataPreference extends Preference {
  avgHits: number;
  hitStdDev: number;
  avgUsers: number;
  userStdDev: number;
  avgSessionsPerUser: number;
  sessionsPerUserStdDev: number;
}

export interface DataTablePreference extends Preference {
  placeholder: unknown; // to disable no-empty-interface TSLint error
}

export interface TextSummaryPreference extends Preference {
  placeholder: unknown;
}
