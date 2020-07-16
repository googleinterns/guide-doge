import { DataMeta } from './types';

export type GeoMapMeta = DataMeta<'geo-map', null>;

export function createGeoMapMeta(
  title: string,
  query: null,
): GeoMapMeta {
  return {
    type: 'geo-map',
    title,
    query,
  };
}
