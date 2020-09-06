import { DataMeta, MetaType } from './types';
import { GeoQuery } from '../queries/geo.query';
import { World } from '../geo.types';
import { geoMapNavigationModuleImporter } from '../../components/geo-map-navigation/geo-map-navigation.importer';

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
    a11yModuleImporters: [
      geoMapNavigationModuleImporter,
    ],
  };
}
