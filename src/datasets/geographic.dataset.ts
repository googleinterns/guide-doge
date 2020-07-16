import { Dataset } from './types';
import { createGeoMapMeta } from './metas/geo-map.meta';

export interface Config {
  offset: number;
}

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
