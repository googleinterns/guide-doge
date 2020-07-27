import { DataMeta, MetaType } from './types';
import { GeoQuery } from '../queries/geo.query';

export type GeoMapMeta = DataMeta<MetaType.GEO_MAP, GeoQuery>;

export function createGeoMapMeta(
  title: string,
  queryData: GeoQuery,
): GeoMapMeta {
  return {
    type: MetaType.GEO_MAP,
    title,
    queryData,
  };
}
