import Chart from 'chart.js/auto';
import io from 'socket.io-client';
import { addTable } from './table/table';
import { getLegend, getLineChartLegend } from './chart/legend';
import {
  barChart,
  processedChart,
  defaultBarChartConfig,
  defaultLineChartConfig,
} from './chart/chart';

const socket = io.connect('localhost:8080');
let lineChart;
let UpTChart;
let BatVChart;
let SolVChart;
let STempChart;
Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#36A2EB';
Chart.defaults.color = '#000';

socket.on('stats_receive', (payload) => {
  if (!lineChart && !UpTChart && !BatVChart && !!SolVChart && !STempChart)
    return;
  const stats = payload.data.slice(-7);
  const lineChartStats = payload.data;
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

  addTable(payload.data);
});

(async () => {
  lineChart = new Chart(
    document.getElementById('lineChart'),
    defaultLineChartConfig()
  );

  UpTChart = new Chart(
    document.getElementById('UpTChart'),
    defaultBarChartConfig()
  );

  BatVChart = new Chart(
    document.getElementById('BatVChart'),
    defaultBarChartConfig()
  );

  SolVChart = new Chart(
    document.getElementById('SolVChart'),
    defaultBarChartConfig()
  );

  STempChart = new Chart(
    document.getElementById('STempChart'),
    defaultBarChartConfig()
  );
})();
