import {Category, Measure, ModelSettings} from './types';
import {DataCube} from './DataCube';
import {
  addNthDay,
  generateCumulativeWeights,
  generateEmptyRows,
  generateHits,
  generateUsersAndSessions,
} from './utils';

/**
 * Creates fake analytics data cube based on the model given by settings.
 *
 * The shape of the cube is determined by the categories and measures that are
 * passed in. The content is generated based on `settings`. For details on
 * what each property in settings does, see the documentation for the settings
 * type in [types.ts](./types.ts).
 *
 * The nthDay category is added to the categories if not present. The number of
 * values is determined by the `days` setting and the weight of each day is
 * determined according to the dailyVariance setting.
 *
 * The data is generated as a series of hits. Each hit is randomly assigned
 * to a category value for each category, based on the weights for each value.
 *
 * The hit is then added to a measure if it is a hit scoped measure, or if it
 * is a session scoped measure and part of a new session or if it is a user
 * scoped measure and represents a new user. For measures of type COUNT, they
 * are incremented by 1, whereas for measures of type SUM a random value in its
 * range is selected and added to the measure for that combination of category
 * values.
 *
 * This generation code makes the following assumptions:
 *  - All categories are independent of each other.
 *  - Each hit has a corresponding category value for each dimension.
 *  - The number of users is normally distributed, with mean settings.avgUsers
 *    and standard deviation settings.usersStdDev.
 *  - The number of sessions per user is normally distributed with mean
 *    settings.avgUsersPerSession and standard deviation settings.sessionsPerUserStdDev.
 *  - The number of hits is normally distributed with mean settings.avgHits
 *    and standard deviation settings.hitsStdDev.
 *  - The value of each hit for measures of type SUM is uniformly distributed in
 *    its range.
 *  - The session a hit belongs to is uniformly distributed.
 *  - The weight of a day is normally distributed with mean 1 and standard
 *    deviation settings.dailyStdDev
 *
 */
export class MockDataCube extends DataCube {
  private static defaultSettings: ModelSettings = {
    avgHits: 1000000,
    hitStdDev: 10000,
    avgUsers: 10000,
    userStdDev: 100,
    avgSessionsPerUser: 5,
    sessionsPerUserStdDev: 3,
    days: 60,
    dailyStdDev: 0.1,
  };

  constructor(
    categories: Category[],
    measures: Measure[],
    settings: Partial<ModelSettings> = {}
  ) {
    const completeSettings: ModelSettings = {
      ...MockDataCube.defaultSettings,
      ...settings,
    };
    const actualCategories = addNthDay(
      categories,
      completeSettings.days,
      completeSettings.dailyStdDev
    );
    const rows = generateEmptyRows(actualCategories, measures);
    const cumulativeWeights = generateCumulativeWeights(rows, actualCategories);

    generateHits(
      rows,
      measures,
      cumulativeWeights,
      generateUsersAndSessions(completeSettings),
      completeSettings
    );

    super(rows, measures, actualCategories);
  }
}
