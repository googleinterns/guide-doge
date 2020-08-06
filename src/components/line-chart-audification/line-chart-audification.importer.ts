import { A11yModuleImporter } from '../../directives/a11y/a11y.directive';

export const audificationModuleImporter: A11yModuleImporter = {
  preferenceKey: 'audification$',

  async import() {
    const { LineChartAudificationModule } = await import('./line-chart-audification.module');
    return LineChartAudificationModule;
  },
};
