import {createLineChart} from './src/line';

const chartDiv = document.getElementById('chart');

createLineChart().then((node) => {
  chartDiv.appendChild(node);
})
