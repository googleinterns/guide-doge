export async function importGeoMapNavigationModule() {
  const { GeoMapNavigationModule } = await import('../../components/geo-map-navigation/geo-map-navigation.module');
  return GeoMapNavigationModule;
}
