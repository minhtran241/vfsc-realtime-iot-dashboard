import Chart from 'chart.js/auto';
import io from 'socket.io-client';
import { addTable } from './table/table';
import { getLegend, getLineChartLegend } from './chart/legend';
import { barChart, processedChart } from './chart/chart';

const socket = io.connect('localhost:8080');
let lineChart;
let UpTChart;
let BatVChart;
let SolVChart;
let STempChart;

socket.on('stats_receive', function (data) {
  if (!lineChart && !UpTChart && !BatVChart && !!SolVChart && !STempChart)
    return;
  const stats = data.data.slice(-5);
  const lineChartStats = data.data.slice(-10);
  const lineChartLegend = getLineChartLegend(lineChartStats);
  const legend = getLegend(stats);

  lineChart = processedChart(lineChart, lineChartStats, lineChartLegend);
  UpTChart = barChart(UpTChart, stats, legend, 'UpT');
  BatVChart = barChart(BatVChart, stats, legend, 'BatV');
  SolVChart = barChart(SolVChart, stats, legend, 'SolV');
  STempChart = barChart(STempChart, stats, legend, 'STemp');

  UpTChart.update();
  BatVChart.update();
  SolVChart.update();
  STempChart.update();
  lineChart.update();

  addTable(data.data);
});

(async function () {
  lineChart = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
  });

  UpTChart = new Chart(document.getElementById('UpTChart'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  BatVChart = new Chart(document.getElementById('BatVChart'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  SolVChart = new Chart(document.getElementById('SolVChart'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  STempChart = new Chart(document.getElementById('STempChart'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
})();
