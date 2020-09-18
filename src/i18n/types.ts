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
  DOMAIN_UNIT_DAY,
  BREAK_SILENCE,
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

export enum GEO_MAP_NAVIGATION_PREFERENCE {
  enabled = 0x500,
}

export enum SUMMARIZATION_PREFERENCE {
  enabled = 0x600,
}

export enum PUNCTUATION {
  QUESTION_MARK = 0x700,
  SLASH,
  PLUS,
  HYPHEN,
}

export enum GEO_MAP_NAVIGATION {
  INSTRUCTIONS = 0x800,
  UNIT_AND_FILTERING_TERRITORY,
  BREAK_SILENCE,
  ACTIVE_DATUM,
  ACTIVE_MEASURE,
  NOTHING_SELECTED,
}

export enum LAYOUT_PREFERENCE {
  enabled = 0x900,
  cardWidth,
}

export type I18nKey =
  GUIDE_DOGE | VISUALIZATION | AUDIFICATION | GEO_MAP_NAVIGATION |
  DATA_PREFERENCE | AUDIFICATION_PREFERENCE | GEO_MAP_NAVIGATION_PREFERENCE | SUMMARIZATION_PREFERENCE |
  PUNCTUATION | LAYOUT_PREFERENCE;

export type I18n = {
  [key in I18nKey]: string;
};
