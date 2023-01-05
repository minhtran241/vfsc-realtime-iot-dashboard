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
let data = null;

let stats;
let lineChartStats;
let barMoments = 10;
let lineMoments = 10;

let lineChart;
let UpTChart;
let BatVChart;
let SolVChart;
let STempChart;
Chart.defaults.backgroundColor = '#9BD0F5';
// Chart.defaults.borderColor = '#36A2EB';
Chart.defaults.color = '#000';

socket.on('stats_receive', (payload) => {
  if (payload) data = payload;
  if (
    !lineChart &&
    !UpTChart &&
    !BatVChart &&
    !SolVChart &&
    !STempChart &&
    !data
  )
    return;
  // if (!UpTChart && !BatVChart && !!SolVChart && !STempChart) return;
  if (data.data.length <= barMoments) {
    stats = data.data;
    if (data.data.length <= lineMoments) {
      lineChartStats = data.data;
    } else {
      lineChartStats = data.data.slice(-lineMoments);
    }
  } else {
    stats = data.data.slice(-barMoments);
    lineChartStats = data.data.slice(-lineMoments);
  }

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

  addTable(data.tableData);
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

// Line chart dropdown handlers
$('#5moments').on('click', () => {
  dropdownHandler(5);
});
$('#25moments').on('click', () => {
  dropdownHandler(25);
});
$('#100moments').on('click', () => {
  dropdownHandler(100);
});

const dropdownHandler = (numberOfEntries) => {
  lineMoments = numberOfEntries;
  barMoments = numberOfEntries;
  document.querySelector(
    '#lineDropdown'
  ).innerText = `Show ${numberOfEntries} moments`;
  if (data.data.length <= barMoments) {
    stats = data.data;
    if (data.data.length <= lineMoments) {
      lineChartStats = data.data;
    } else {
      lineChartStats = data.data.slice(-lineMoments);
    }
  } else {
    stats = data.data.slice(-barMoments);
    lineChartStats = data.data.slice(-lineMoments);
  }
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
};
