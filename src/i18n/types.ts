export enum GUIDE_DOGE {
  TITLE = 0x000, // explicitly inits the first value of each enum with a different value to prevent i18n key conflicts
  VISUALIZATION,
  AUDIFICATION
}

export enum VISUALIZATION {
}

export enum AUDIFICATION {
  INSTRUCTIONS = 0x200,
  DOMAIN,
  RANGE,
  ACTIVE_POINT,
  CURRENT_LEGEND_ITEM,
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

export enum TEXT_SUMMARY_PREFERENCE {
  enabled = 0x600,
}

export enum PUNCTUATION {
  QUESTION_MARK = 0x700,
}

export type I18nKey =
  GUIDE_DOGE | VISUALIZATION | AUDIFICATION |
  DATA_PREFERENCE | AUDIFICATION_PREFERENCE | DATA_TABLE_PREFERENCE | TEXT_SUMMARY_PREFERENCE |
  PUNCTUATION;

export type I18n = {
  [key in I18nKey]: string;
};
