export async function importAudificationModule() {
  const { LineChartAudificationModule } = await import('./line-chart-audification.module');
  return LineChartAudificationModule;
}
