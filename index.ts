import {createLineChart} from './src/line';

if (module.hot) {
  module.hot.accept();
}

function assertExists<T>(value: T|null|undefined): T {
  if(value == null) {
    throw new Error(`Expected to exist: ${value}`);
  }
  return value;
}

const chartDiv = assertExists(document.getElementById('chart') as HTMLDivElement);

function init() {
  createLineChart().then((node) => {
    chartDiv.textContent = '';
    chartDiv.appendChild(node);
  });
}
init();

if (module.hot) {
  module.hot.dispose(function() {
    // module is about to be replaced
  })

  module.hot.accept(function() {
    init();
  })
}
