import { betweenDates, inCities } from '../../models/data-cube/filters';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { MeasureValues } from '../../models/data-cube/types';
import { City, Territory, TerritoryLevel, World } from '../geo.types';
import { isNotNullish } from '../../utils/misc';

export interface GeoQueryOptions {
  /** The date range to filter geo data with. */
  range: [Date, Date];
  /** The territory to filter geo data with. */
  territory: Territory | null;
  /** The territory level of each geo datum. */
  unit: TerritoryLevel;
}

export interface GeoDatum {
  territory: Territory;
  values: MeasureValues;
}

export type GeoQuery = (options: GeoQueryOptions) => GeoDatum[];

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

/**
 * Create a geo query function. The query function takes GeoQueryOptions and returns an array of GeoDatum.
 *
 * @param dataCube The data cube to query the raw rows from.
 * @param measureNames The measures to query.
 * @param world The world object.
 */
export function createGeoQuery(
  dataCube: DataCube,
  measureNames: string[],
  world: World,
): GeoQuery {
  const cities = world[CITY];
  return queryOptions => {
    const [startDate, endDate] = queryOptions.range;

    const cityCategoryName = 'city';
    const dateCategoryName = 'date';

    const dateFilter = betweenDates(startDate, endDate, { excludeStart: true });
    const cityFilter = queryOptions.territory && inCities(getCityIds(cities, queryOptions.territory));

    const rows = dataCube.getDataFor({
      categoryNames: [cityCategoryName],
      measureNames,
      filters: [dateFilter, cityFilter].filter(isNotNullish),
      sortBy: [dateCategoryName],
    });

    // merge rows to the given unit (e.g., merge city rows to country rows)
    const rowGroups: Record<string, MeasureValues> = {};
    const idAccessor = getIdAccessor(queryOptions.unit);
    for (const row of rows) {
      const cityId = row.categories.city;
      const city = cities[cityId];
      const id = idAccessor(city);
      if (id in rowGroups) {
        const cumulativeValues = rowGroups[id];
        Object.entries(row.values).forEach(([key, value]) => {
          cumulativeValues[key] += value;
        });
      } else {
        rowGroups[id] = { ...row.values };
      }
    }

    return Object.entries(rowGroups)
      .map(([id, values]) => ({
        territory: world[queryOptions.unit][id],
        values,
      }))
      .sort((a, b) => b.values.activeUsers - a.values.activeUsers);
  };
}

function getCityIds(cities: Record<string, City>, territory: Territory) {
  const idAccessor = getIdAccessor(territory.level);
  return Object.values(cities)
    .filter(city => idAccessor(city) === territory.id)
    .map(city => city.id);
}

function getIdAccessor(level: TerritoryLevel): (city: City) => string {
  return city => {
    let territory: Territory = city;
    let nestedCount = [
      CITY,
      COUNTRY,
      SUBCONTINENT,
      CONTINENT,
    ].indexOf(level);
    while (nestedCount-- > 0) {
      territory = territory.parent;
    }
    return territory.id;
  };
}
