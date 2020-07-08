export enum GUIDE_DOGE {
  TITLE = 0x000, // explicitly inits the first value of each enum with a different value to prevent i18n key conflicts
  VISUALIZATION,
  AUDIFICATION
}

export enum VISUALIZATION {
  ACTIVE_DATUM = 0x100,
}

export enum AUDIFICATION {
  INSTRUCTIONS = 0x200,
  DOMAIN,
  RANGE,
  ACTIVE_DATUM,
}

export enum DATA_PREFERENCE {
  enabled = 0x300,
  name,
  avgHits,
  hitStdDev,
  avgUsers,
  userStdDev,
  avgSessionsPerUser,
  sessionsPerUserStdDev,
  offset,
}

export enum AUDIFICATION_PREFERENCE {
  enabled = 0x400,
  lowestPitch,
  highestPitch,
  noteDuration,
  readBefore,
  readAfter,
}

export enum DATA_TABLE_PREFERENCE {
  enabled = 0x500,
}

export enum SUMMARIZATION_PREFERENCE {
  enabled = 0x600,
}

export type I18nKey =
  GUIDE_DOGE | VISUALIZATION | AUDIFICATION |
  DATA_PREFERENCE | AUDIFICATION_PREFERENCE | DATA_TABLE_PREFERENCE | SUMMARIZATION_PREFERENCE;

export type I18n = {
  [key in I18nKey]: string;
};
