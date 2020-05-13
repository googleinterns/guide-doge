import {createLineChart} from './line';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

function init() {
  createLineChart().then(node => {
    chartDiv.textContent = '';
    chartDiv.appendChild(node);
  });
}
init();

if (module.hot) {
  module.hot.dispose(() => {
    // module is about to be replaced
  });

  module.hot.accept(() => {
    init();
  });
}
