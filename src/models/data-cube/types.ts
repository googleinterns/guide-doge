/** A description of a type of value that a hit can belong to. */
export interface Category {
  /** The canonical name for this category. */
  name: string;

  /** The possible values the category can take on. */
  values: CategoryValue[];
}

/** Describes a possible value a category can have. */
export interface CategoryValue {
  /** A label for this particular value */
  name: string | number;

  /**
   * How likely this value is to occur, relative to the other values in this
   * category.
   */
  weight: number;
}

/** A value that can be measured. */
export interface Measure {
  /** The canonical name for this measure. */
  name: string;
  /** If this measure applies to events, sessions or users. */
  scope: Scope;
  /** How the values from this measure are calculated. */
  type: MeasureType;
  /**
   * The range of values this measure can take on per hit, if the measure
   * is of type SUM.
   */
  range?: [number, number];
}

/** The way this measure is calculated */
export enum MeasureType {
  COUNT,
  SUM,
}

/** What this measure is associated with. */
export enum Scope {
  EVENT,
  SESSION,
  USER,
}

/**
 * Used to control the model for data generation. More details about how this
 * is used is available in [generation.ts](./generation.ts).
 */
export type ModelSettings = HitGenerationSettings &
  SessionGenerationSettings &
  NthDayGenerationSettings;

export interface HitGenerationSettings {
  /** The average number of hits over the lifetime of the data generation. */
  avgHits: number;
  /** The standard deviation of hits over the time lifetime of the data generation. */
  hitStdDev: number;
}

export interface SessionGenerationSettings {
  /** The average number of users for this data generation. */
  avgUsers: number;
  /** The standard deviation of users for this data generation. */
  userStdDev: number;
  /** The average number of sessions per user. */
  avgSessionsPerUser: number;
  /** The standard deviation of sessions per user. */
  sessionsPerUserStdDev: number;
}

export interface NthDayGenerationSettings {
  /** Whether to generate nth day category or not */
  nthDay: boolean;
  /** The number of days worth of data to generate. */
  days: number;
  /** How much the number of hits can vary from day to day. */
  dailyStdDev: number;
}

/**
 * A filter is applied to the data in a cube before being queried.
 *
 * A filter is a factory function that actually generates the filter when
 * called. The idea is that the first call will allow the filter to configure
 * itself with any necessary values, so that the second call can run very
 * quickly on each row.
 */
export type Filter = (
  categories: Category[],
  measures: Measure[],
) => (row: Row) => boolean;

/**
 * The internal storage of the cube. Although the cube is conceptually an
 * n-dimensional cube of data, in actuality it is a list of rows, to make for
 * easier querying. */
export interface Row {
  /** The category values for this row. */
  header: (string | number)[];
  /** The measure values for this row. */
  values: number[];
}

/**
 * The data returned from a query to a cube. The category and measure values
 * are stored in a map keyed on the name of the respective category or
 * dimension.
 */
export interface ResultRow {
  categories: Map<string, string | number>;
  values: Map<string, number>;
}
