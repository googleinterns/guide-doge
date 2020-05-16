import {LineChart} from './visualizations/LineChart';
import {MockDataCube} from './datagen/MockDataCube';
import {
  activeUserMeasure,
  browserCategory,
  countryCategory,
  eventCountMeasure,
  revenueMeasure,
  sourceCategory,
} from './datagen/presets';

declare const module: any;

if (module.hot) {
  module.hot.accept();
}

function assertExists<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error(`Expected to exist: ${value}`);
  }
  return value;
}

const chartDiv = assertExists(
  document.getElementById('chart') as HTMLDivElement
);

async function init() {
  const dataCube = new MockDataCube(
    [countryCategory, browserCategory, sourceCategory],
    [activeUserMeasure, revenueMeasure, eventCountMeasure]
  );
  const lineChart = new LineChart(dataCube);
  const svg = lineChart.render();
  chartDiv.textContent = '';
  chartDiv.appendChild(svg.node()!);
}

init().catch(console.error);

if (module.hot) {
  module.hot.dispose(() => {
    // module is about to be replaced
  });

  module.hot.accept(() => {
    init().catch(console.error);
  });
}
