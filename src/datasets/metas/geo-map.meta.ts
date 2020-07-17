import { DataMeta } from './types';
import { GeoQuery } from '../queries/geo.query';

export type GeoMapMeta = DataMeta<'geo-map', GeoQuery>;

export function createGeoMapMeta(
  title: string,
  queryData: GeoQuery,
): GeoMapMeta {
  return {
    type: 'geo-map',
    title,
    queryData,
  };
}
