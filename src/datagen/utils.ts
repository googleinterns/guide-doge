import random from 'random';
import {
  Category,
  HitGenerationSettings,
  Measure,
  MeasureType,
  Row,
  Scope,
  Session,
  SessionGenerationSettings,
} from './types';

export function generateUsersAndSessions({
  avgUsers,
  userStdDev,
  avgSessionsPerUser,
  sessionsPerUserStdDev,
}: SessionGenerationSettings) {
  const userCount = Math.round(random.normal(avgUsers, userStdDev)());
  const sessionThunk = random.normal(avgSessionsPerUser, sessionsPerUserStdDev);
  const sessions: Session[] = [];
  for (let i = 0; i < userCount; i++) {
    const user = {rowsSeen: new Set<number>()};
    const userSessions = Math.round(sessionThunk());
    for (let j = 0; j < userSessions; j++) {
      sessions.push({user, rowsSeen: new Set()});
    }
  }
  return sessions;
}

export function getNormalizedWeights(categories: Category[]) {
  return categories.map(category => {
    const total = category.values.reduce(
      (total, value) => value.weight + total,
      0
    );
    return category.values.map(value => value.weight / total);
  });
}

export function binarySearch(
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

export function generateMeasureIncrement(measure: Measure) {
  if (measure.type === MeasureType.COUNT || !measure.range) {
    return 1;
  }
  return random.float(measure.range[0], measure.range[1]);
}

export function generateHits(
  rows: Row[],
  measures: Measure[],
  cumulativeWeights: number[],
  sessions: Session[],
  {avgHits, hitStdDev}: HitGenerationSettings
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

export function generateEmptyRows(categories: Category[], measures: Measure[]) {
  const rows: Row[] = [];

  // The current index in each category of which value we've looked at
  const categoryValueIndices = categories.map(() => 0);
  let categoryIndex = 0;
  // This is going to loop through all combinations of category values.
  // The approach we take is to iterate through all the first category's values.
  // Then we move to the next value in the second category and iterate through
  // all the values in the first category again. We then move to the next value
  // in the second category, and repeat again and again until we've gone through
  // all the values in the second category. We then move to the next value
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

export function generateCumulativeWeights(rows: Row[], categories: Category[]) {
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

export function generateNthDay(days: number, dailyVariance: number): Category {
  const dailyThunk = random.normal(1, dailyVariance);
  const values = [];
  for (let day = 0; day < days; day++) {
    values.push({
      name: day,
      weight: dailyThunk(),
    });
  }
  return {
    name: 'nthDay',
    values,
  };
}
