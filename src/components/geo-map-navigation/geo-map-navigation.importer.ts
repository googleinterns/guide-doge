import { A11yModuleImporter } from '../../directives/a11y/a11y.directive';

export const geoMapNavigationModuleImporter: A11yModuleImporter = {
  preferenceKey: 'geoMapNavigation$',

  async import() {
    const { GeoMapNavigationModule } = await import('./geo-map-navigation.module');
    return GeoMapNavigationModule;
  },
};
