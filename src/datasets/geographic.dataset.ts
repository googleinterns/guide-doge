import { Dataset } from './types';
import { createGeoMapMeta } from './metas/geo-map.meta';
import { PreferenceMeta } from '../services/preference/types';

export interface Config {
  offset: number;
}

export const configMeta: PreferenceMeta<Config> = {
  offset: {
    type: 'number',
    defaultValue: 1000,
  },
};

export function create(config: Config): Dataset {
  const geoMapMeta = createGeoMapMeta(
    'Geo Map',
    null,
  );

  const metas = [
    geoMapMeta,
  ];

  return {
    metas,
  };
}
