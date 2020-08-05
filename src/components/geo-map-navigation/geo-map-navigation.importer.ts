export async function importGeoMapNavigationModule() {
  const { GeoMapNavigationModule } = await import('./geo-map-navigation.module');
  return GeoMapNavigationModule;
}
