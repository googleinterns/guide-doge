import { betweenDates, inCities } from '../../models/data-cube/filters';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { Filter, MeasureValues } from '../../models/data-cube/types';

export enum TerritoryLevel {
  CONTINENT,
  SUBCONTINENT,
  COUNTRY,
  CITY,
}

export interface Territory {
  level: TerritoryLevel;
  id: string;
}

export interface GeoQueryOptions {
  /** The date range to filter geo data with. */
  range: [Date, Date];
  /** The territory to filter geo data with. */
  territory?: Territory;
  /** The territory level of each geo datum. */
  unit: TerritoryLevel;
}

export interface GeoDatum {
  id: string;
  values: MeasureValues;
}

export type GeoQuery = (options: GeoQueryOptions) => GeoDatum[];

export interface City {
  countryId: string;
  subcontinentId: string;
  continentId: string;
  name: string;
  lat: number;
  lng: number;
  population: number;
}

/**
 * Create a geo query function. The query function takes GeoQueryOptions and returns an array of GeoDatum.
 *
 * @param dataCube The data cube to query the raw rows from.
 * @param measureNames The measures to query.
 * @param cities The mapping from city id to city object.
 */
export function createGeoQuery<S>(
  dataCube: DataCube,
  measureNames: string[],
  cities: Record<string, City>,
): GeoQuery {
  return queryOptions => {
    const [startDate, endDate] = queryOptions.range;

    const cityCategoryName = 'city';
    const dateCategoryName = 'date';

    const dateFilter = betweenDates(startDate, endDate, { excludeStart: true });
    const cityFilter = queryOptions.territory && inCities(getCityIds(cities, queryOptions.territory));

    const rows = dataCube.getDataFor({
      categoryNames: [cityCategoryName],
      measureNames,
      filters: [dateFilter, cityFilter].filter((filter): filter is Filter => filter !== undefined),
      sortBy: [dateCategoryName],
    });

    // merge rows to the given unit (e.g., merge city rows to country rows)
    const rowGroups: Record<string, MeasureValues> = {};
    const idAccessor = getIdAccessor(queryOptions.unit);
    for (const row of rows) {
      const cityId = row.categories.city;
      const city = cities[cityId];
      const id = idAccessor([cityId, city]);
      if (id in rowGroups) {
        const cumulativeValues = rowGroups[id];
        Object.entries(row.values).forEach(([key, value]) => {
          cumulativeValues[key] += value;
        });
      } else {
        rowGroups[id] = { ...row.values };
      }
    }

    return Object.entries(rowGroups).map(([id, values]) => ({ id, values }));
  };
}

function getCityIds(cities: Record<string, City>, territory: Territory) {
  const idAccessor = getIdAccessor(territory.level);
  return Object.entries(cities)
    .filter(cityEntry => idAccessor(cityEntry) === territory.id)
    .map(([cityId]) => cityId);
}

function getIdAccessor(level: TerritoryLevel): (cityEntry: [string, City]) => string {
  switch (level) {
    case TerritoryLevel.CITY:
      return ([cityId]) => cityId;
    case TerritoryLevel.COUNTRY:
      return ([, city]) => city.countryId;
    case TerritoryLevel.SUBCONTINENT:
      return ([, city]) => city.subcontinentId;
    case TerritoryLevel.CONTINENT:
      return ([, city]) => city.continentId;
  }
}
