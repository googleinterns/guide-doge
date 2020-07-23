import { DataMeta, MetaType } from './types';

export type GeoMapMeta = DataMeta<MetaType.GEO_MAP, () => null>;

export function createGeoMapMeta(
  title: string,
  queryData: () => null,
): GeoMapMeta {
  return {
    type: MetaType.GEO_MAP,
    title,
    queryData,
  };
}
