import { A11yModuleImporter } from '../../directives/a11y/a11y.directive';

export const summarizationModuleImporter: A11yModuleImporter = {
  preferenceKey: 'summarization$',

  async import() {
    const { ChartSummarizationModule } = await import('./chart-summarization.module');
    return ChartSummarizationModule;
  },
};
