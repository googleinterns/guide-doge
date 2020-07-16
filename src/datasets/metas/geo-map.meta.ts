import { DataMeta } from './types';

export type GeoMapMeta = DataMeta<'geo-map', null>;

export function createGeoMapMeta(
  title: string,
  queryData: null,
): GeoMapMeta {
  return {
    type: 'geo-map',
    title,
    queryData,
  };
}
