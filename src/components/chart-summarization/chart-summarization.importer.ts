export async function importSummarizationModule() {
  const { ChartSummarizationModule } = await import('./chart-summarization.module');
  return ChartSummarizationModule;
}
