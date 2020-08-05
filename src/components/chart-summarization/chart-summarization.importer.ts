export async function importSummarizationModule() {
  const { ChartSummarizationModule } = await import('../../components/chart-summarization/chart-summarization.module');
  return ChartSummarizationModule;
}
