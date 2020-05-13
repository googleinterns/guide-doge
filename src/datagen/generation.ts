import random from 'random';
import {
  Category,
  Measure,
  MeasureType,
  Row,
  ModelSettings,
  Scope,
} from './types';
import {DataCube} from './cube';

/**
 * Creates fake analytics data based on the model given by settings.
 *
 * The fake data is returned as a Cube.  See [cube.ts](./cube.ts) for more
 * information on the properties of the cube.
 *
 * The shape of the cube is determined by the categories and measures that are
 * passed in.  The content is generated based on `settings`.  For details on
 * what each property in settings does, see the documentation for the settings
 * type in [types.ts](./types.ts).
 *
 * The nthDay category is added to the categories if not present.  The number of
 * values is determined by the `days` setting and the weight of each day is
 * determined according to the dailyVariance setting.
 *
 * The data is generated as a series of hits.  Each hit is randomly assigned
 * to a category value for each category, based on the weights for each value.
 *
 * The hit is then added to a measure if it is a hit scoped measure, or if it
 * is a session scoped measure and part of a new session or if it is a user
 * scoped measure and represents a new user.  For measures of type COUNT, they
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
export function generateCube(
  categories: Category[],
  measures: Measure[],
  settings: Partial<ModelSettings> = {}
): DataCube {
  const completeSettings: ModelSettings = {...defaultSettings, ...settings};
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
    initalizeUsersAndSessions(completeSettings),
    completeSettings
  );

  return new DataCube(rows, measures, actualCategories);
}

const defaultSettings: ModelSettings = {
  avgHits: 1000000,
  hitStdDev: 10000,
  avgUsers: 10000,
  userStdDev: 100,
  avgSessionsPerUser: 5,
  sessionsPerUserStdDev: 3,
  days: 60,
  dailyStdDev: 0.1,
};

interface User {
  rowsSeen: Set<number>;
}

interface Session {
  user: User;
  rowsSeen: Set<number>;
}

function initalizeUsersAndSessions({
  avgUsers,
  userStdDev,
  avgSessionsPerUser,
  sessionsPerUserStdDev,
}: {
  avgUsers: number;
  userStdDev: number;
  avgSessionsPerUser: number;
  sessionsPerUserStdDev: number;
}) {
  const userCount = Math.round(random.normal(avgUsers, userStdDev)());
  const sessionThunk = random.normal(avgSessionsPerUser, sessionsPerUserStdDev);
  const users: User[] = [];
  const sessions: Session[] = [];
  for (let i = 0; i < userCount; i++) {
    const user = {rowsSeen: new Set<number>()};
    users.push(user);
    const userSessions = Math.round(sessionThunk());
    for (let j = 0; j < userSessions; j++) {
      sessions.push({user, rowsSeen: new Set()});
    }
  }
  return sessions;
}

function getNormalizedWeights(categories: Category[]) {
  return categories.map(category => {
    const total = category.values.reduce(
      (total, value) => value.weight + total,
      0
    );
    return category.values.map(value => value.weight / total);
  });
}

function binarySearch(
  arr: number[],
  probe: number,
  start = 0,
  end = arr.length
): number {
  const len = end - start;
  if (len < 2) {
    return start;
  }
  const index = len % 2 === 0 ? (start + end) / 2 : (start + end - 1) / 2;
  if (arr[index] <= probe) {
    return binarySearch(arr, probe, index, end);
  } else {
    return binarySearch(arr, probe, start, index);
  }
}

function generateMeasureIncrement(measure: Measure) {
  if (measure.type === MeasureType.COUNT || !measure.range) {
    return 1;
  }
  return random.float(measure.range[0], measure.range[1]);
}

function generateHits(
  rows: Row[],
  measures: Measure[],
  cumulativeWeights: number[],
  sessions: Session[],
  {avgHits, hitStdDev}: {avgHits: number; hitStdDev: number}
) {
  const hitTotal = Math.round(random.normal(avgHits, hitStdDev)());
  const placementThunk = random.uniform();
  const sessionThunk = random.uniformInt(0, sessions.length - 1);
  for (let i = 0; i < hitTotal; i++) {
    const placement = placementThunk();
    const session = sessionThunk();
    const rowIndex = binarySearch(cumulativeWeights, placement);
    for (const [index, measure] of measures.entries()) {
      const newSession = !sessions[session].rowsSeen.has(rowIndex);
      const newUser = !sessions[session].user.rowsSeen.has(rowIndex);
      if (newSession) {
        sessions[session].rowsSeen.add(rowIndex);
        if (newUser) {
          sessions[session].user.rowsSeen.add(rowIndex);
        }
      }

      switch (measure.scope) {
        case Scope.EVENT:
          rows[rowIndex].values[index] += generateMeasureIncrement(measure);
          break;
        case Scope.SESSION:
          if (newSession) {
            rows[rowIndex].values[index] += generateMeasureIncrement(measure);
          }
          break;
        case Scope.USER:
          if (newUser) {
            rows[rowIndex].values[index] += generateMeasureIncrement(measure);
          }
          break;
      }
    }
  }
}

function generateEmptyRows(categories: Category[], measures: Measure[]) {
  const rows: Row[] = [];

  // The current index in each category of which value we've looked at
  const categoryValueIndices = categories.map(() => 0);
  let categoryIndex = 0;
  // This is going to loop through all combinations of category values.
  // The approach we take is to iterate through all the first category's values.
  // Then we move to the next value in the second category and iterate through
  // all the values in the first category again.  We then move to the next value
  // in the second category, and repeat again and again until we've gone through
  // all the values in the second category.  We then move to the next value
  // in the third category, then repeat, and so on and so on until we've gone
  // through every possible value.
  do {
    // Get the current combination of values and add them to the list
    const header = categories.map(
      (category, index) => category.values[categoryValueIndices[index]].name
    );
    const values = measures.map(() => 0);
    rows.push({header, values});

    // Start with the first category
    categoryIndex = 0;
    do {
      // Advance to the next category value in the current value
      categoryValueIndices[categoryIndex] =
        (categoryValueIndices[categoryIndex] + 1) %
        categories[categoryIndex].values.length;
      categoryIndex += 1;
      // If we wrapped around to the beginning of the list of values for the
      // current category, move to the next category so that its value can
      // be incremented
    } while (
      categoryValueIndices[categoryIndex - 1] === 0 &&
      categoryIndex < categories.length
    );
    // If we ended up with the first value in the previous category, then
    // that means we ran off the end of the list of possible categories, so
    // we should end the loop
  } while (categoryValueIndices[categoryIndex - 1] !== 0);
  return rows;
}

function generateCumulativeWeights(rows: Row[], categories: Category[]) {
  const weights = getNormalizedWeights(categories);
  const nameToWeightMapping = categories.map(
    (category, categoryIndex) =>
      new Map(
        category.values.map((value, index) => [
          value.name,
          weights[categoryIndex][index],
        ])
      )
  );
  return rows.reduce(
    (cumulativeWeights, row) => {
      const weightDelta = row.header.reduce(
        (weightDelta, label, categoryIndex) =>
          (weightDelta as number) *
          (nameToWeightMapping[categoryIndex].get(label) ?? 0),
        1
      ) as number;
      cumulativeWeights.push(
        weightDelta + cumulativeWeights[cumulativeWeights.length - 1]
      );
      return cumulativeWeights;
    },
    [0]
  );
}

function addNthDay(
  categories: Category[],
  days: number,
  dailyVariance: number
): Category[] {
  if (categories.find(category => category.name === 'nthDay')) {
    return categories;
  }
  const dailyThunk = random.normal(1, dailyVariance);
  const values = [];
  for (let day = 0; day < days; day++) {
    values.push({
      name: day,
      weight: dailyThunk(),
    });
  }
  return [
    {
      name: 'nthDay',
      values,
    },
    ...categories,
  ];
}
