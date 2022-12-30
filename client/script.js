import Chart from 'chart.js/auto';
import io from 'socket.io-client';
import { addTable } from './table/table';
import { getLegend } from './chart/legend';
import { processedChart } from './chart/chart';

const socket = io.connect('localhost:8080');
let chart;

socket.on('stats_receive', function (data) {
  if (!chart) return;
  const stats = data.data.slice(-8);
  const legend = getLegend(stats);
  chart = processedChart(chart, stats, legend);
  chart.update();
  addTable(data.data);
});

(async function () {
  chart = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
  });
})();
