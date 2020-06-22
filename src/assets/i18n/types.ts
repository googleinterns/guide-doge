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

export type I18n = {
  [key in GUIDE_DOGE | VISUALIZATION | AUDIFICATION]: string;
};
