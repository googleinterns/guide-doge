import { Dataset } from './types';
import { createGeoMapMeta } from './metas/geo-map.meta';
import { PreferenceMeta } from '../services/preference/types';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../models/data-cube/presets';
import { createDefault } from '../utils/preferences';
import { generateCube } from '../models/data-cube/generation';
import { Category } from '../models/data-cube/types';
import { createGeoQuery, TerritoryLevel } from './queries/geo.query';
import { City, Continent, Country, RawWorld, Subcontinent, Territory, World } from './geo.types';
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
  const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

  const rawWorld = (await import('../assets/world.json')) as unknown as RawWorld;
  const world: World = {
    topology: rawWorld.topology,
    [CONTINENT]: {},
    [SUBCONTINENT]: {},
    [COUNTRY]: {},
    [CITY]: {},
  };

  function mergeChildGeometries(territory: Territory) {
    const geometries = Object.values(territory.children)
      .map(subcontinent => subcontinent.geometry)
      .filter(isNotNullish);
    return geometries.length ? topojson.mergeArcs(rawWorld.topology, geometries) : null;
  }

  // flatten the hierarchical territory data and create mutual links between parent and child territories
  Object.entries(rawWorld.continents).forEach(([continentId, rawContinent]) => {
    const continent: Continent = world[CONTINENT][continentId] = {
      level: CONTINENT,
      id: continentId,
      parent: null,
      children: {},
      name: rawContinent.name,
      geometry: null,
    };
    Object.entries(rawContinent.subcontinents).forEach(([subcontinentId, rawSubcontinent]) => {
      const subcontinent: Subcontinent = world[SUBCONTINENT][subcontinentId] = {
        level: SUBCONTINENT,
        id: subcontinentId,
        parent: continent,
        children: {},
        name: rawSubcontinent.name,
        geometry: null,
      };
      continent.children[subcontinentId] = subcontinent;
      Object.entries(rawSubcontinent.countries).forEach(([countryId, rawCountry]) => {
        const country: Country = world[COUNTRY][countryId] = {
          level: COUNTRY,
          id: countryId,
          parent: subcontinent,
          children: {},
          name: rawCountry.name,
          geometry: rawCountry.geometry,
        };
        subcontinent.children[countryId] = country;
        Object.entries(rawCountry.cities).forEach(([cityId, rawCity]) => {
          const city: City = world[CITY][cityId] = {
            level: CITY,
            id: cityId,
            parent: country,
            children: {},
            ...rawCity,
          };
          country.children[cityId] = city;
        });
      });
      subcontinent.geometry = mergeChildGeometries(subcontinent);
    });
    continent.geometry = mergeChildGeometries(continent);
  });

  return world;
}

export async function create(config: Config): Promise<Dataset> {
  const world = await fetchWorld();

  const cities = world[TerritoryLevel.CITY];
  const cityCategory: Category = {
    name: 'city',
    values: Object.values(cities).map(city => ({
      name: city.id,
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
      world,
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
