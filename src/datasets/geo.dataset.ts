import { Dataset } from './types';
import { createGeoMapMeta } from './metas/geo-map.meta';
import { PreferenceMeta } from '../services/preference/types';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../models/data-cube/presets';
import { createDefault } from '../utils/preferences';
import { generateCube } from '../models/data-cube/generation';
import { Category } from '../models/data-cube/types';
import { createGeoQuery, TerritoryLevel } from './queries/geo.query';
import { City, Continent, Country, RawWorld, World } from './geo.types';
import { isNotNullish } from '../utils/misc';
import * as topojson from 'topojson';

export interface Config {
  avgHits: number;
  hitStdDev: number;
  avgUsers: number;
  userStdDev: number;
  avgSessionsPerUser: number;
  sessionsPerUserStdDev: number;
}

export const configMeta: PreferenceMeta<Config> = {
  avgHits: {
    type: 'number',
    defaultValue: 10000,
  },
  hitStdDev: {
    type: 'number',
    defaultValue: 100,
  },
  avgUsers: {
    type: 'number',
    defaultValue: 100,
  },
  userStdDev: {
    type: 'number',
    defaultValue: 1,
  },
  avgSessionsPerUser: {
    type: 'number',
    defaultValue: 5,
  },
  sessionsPerUserStdDev: {
    type: 'number',
    defaultValue: 3,
  },
};

export async function fetchWorld(): Promise<World> {
  const world: RawWorld & {
    continents: Record<string, Continent>
  } = (await import('../assets/world.json')) as any;

  Object.entries(world.continents).forEach(([continentId, continent]) => {
    Object.entries(continent.subcontinents).forEach(([subcontinentId, subcontinent]) => {
      // add ids of superordinate territories
      subcontinent.continentId = continentId;

      Object.entries(subcontinent.countries).forEach(([countryId, country]) => {
        // add ids of superordinate territories
        country.subcontinentId = subcontinentId;
        country.continentId = continentId;

        Object.values(country.cities).forEach(city => {
          // add ids of superordinate territories
          city.countryId = countryId;
          city.subcontinentId = subcontinentId;
          city.continentId = continentId;
        });
      });

      // merge geometries of subordinate territories
      const countryGeometries = Object.values(subcontinent.countries).map(country => country.geometry).filter(isNotNullish);
      subcontinent.geometry = countryGeometries.length ? topojson.mergeArcs(world.topology, countryGeometries) : null;
    });

    // merge geometries of subordinate territories
    const subcontinentGeometries = Object.values(continent.subcontinents).map(subcontinent => subcontinent.geometry).filter(isNotNullish);
    continent.geometry = subcontinentGeometries.length ? topojson.mergeArcs(world.topology, subcontinentGeometries) : null;
  });

  function unwind<T, K extends keyof T>(parentObject: Record<string, T>, key: K) {
    return Object.values(parentObject).reduce((acc, object) => ({ ...acc, ...object[key] }), {} as T[K]);
  }

  const { continents, topology } = world;

  // flatten hierarchical data for each dimension
  const subcontinents = unwind(continents, 'subcontinents');
  const countries: Record<string, Country> = unwind(subcontinents, 'countries');
  const cities: Record<string, City> = unwind(countries, 'cities');

  return {
    [TerritoryLevel.CONTINENT]: continents,
    [TerritoryLevel.SUBCONTINENT]: subcontinents,
    [TerritoryLevel.COUNTRY]: countries,
    [TerritoryLevel.CITY]: cities,
    topology,
  };
}

export async function create(config: Config): Promise<Dataset> {
  const world = await fetchWorld();

  const cities = world[TerritoryLevel.CITY];
  const cityCategory: Category = {
    name: 'city',
    values: Object.entries(cities).map(([cityId, city]) => ({
      name: cityId,
      weight: city.population,
    })),
  };

  const categories = [cityCategory];
  const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];

  const defaultConfig = createDefault(configMeta);
  const dataCube = generateCube(categories, measures, {
    ...defaultConfig,
    ...config,
  });

  const geoMapMeta = createGeoMapMeta(
    'Geo Map',
    createGeoQuery(
      dataCube,
      measures.map(measure => measure.name),
      cities,
    ),
    world,
  );

  const metas = [
    geoMapMeta,
  ];

  return {
    metas,
  };
}
