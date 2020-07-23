import { DataMeta, MetaType } from './types';
import { GeoQuery } from '../queries/geo.query';
import { World } from '../geo.dataset';

export interface GeoMapMeta extends DataMeta<MetaType.GEO_MAP, GeoQuery> {
  world: World;
}

export function createGeoMapMeta(
  title: string,
  queryData: GeoQuery,
  world: World,
): GeoMapMeta {
  return {
    type: MetaType.GEO_MAP,
    title,
    queryData,
    world,
  };
}
