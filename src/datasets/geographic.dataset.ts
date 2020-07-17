import { Dataset } from './types';
import { createGeoMapMeta } from './metas/geo-map.meta';
import { PreferenceMeta } from '../services/preference/types';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../models/data-cube/presets';
import { createDefault } from '../utils/preferences';
import { generateCube } from '../models/data-cube/generation';
import { Category } from '../models/data-cube/types';
import * as d3 from 'd3-fetch';

export interface Config {
  avgHits: number;
  hitStdDev: number;
  avgUsers: number;
  userStdDev: number;
  avgSessionsPerUser: number;
  sessionsPerUserStdDev: number;
}

export interface Country {

}

export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
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

export async function create(config: Config): Promise<Dataset> {
  const { cities } = await import('../assets/cities.json');
  const cityMap: { [id: string]: City } = {};
  for (const city of cities) {
    cityMap[city.id] = city;
  }
  const cityCategory: Category = {
    name: 'city',
    values: cities.map(city => ({
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

  // dataCube.getDataFor({});

  const geoMapMeta = createGeoMapMeta(
    'Geo Map',
    () => null,
  );

  const metas = [
    geoMapMeta,
  ];

  return {
    metas,
  };
}
