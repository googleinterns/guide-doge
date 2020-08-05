export async function importAudificationModule() {
  const { LineChartAudificationModule } = await import('../../components/line-chart-audification/line-chart-audification.module');
  return LineChartAudificationModule;
}
