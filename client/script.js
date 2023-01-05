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
import {
  addSensorMenuItem,
  getSensorIds,
  getStatsOfSensor,
} from './chart/sensors';

const socket = io.connect('localhost:8080');
let data = null;
const MOMENT_LIST = [5, 10, 25, 50, 100];

let stats;
let lineChartStats;
let barMoments = 10;
let lineMoments = 10;
let sensors;
let currentSensor;

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

  sensors = getSensorIds(data.data);
  addSensorMenuItem(sensors);
  sensors.map((sensor) => {
    $(`#${sensor}`).on('click', () => {
      sensorsDropdownHandler(sensor, false);
    });
  });
  $('#allSensors').on('click', () => {
    sensorsDropdownHandler(null, true);
  });

  if (currentSensor) stats = getStatsOfSensor(data.data, currentSensor);
  else stats = data.data;
  updateCharts();
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
MOMENT_LIST.map((moment) => {
  $(`#${moment.toString()}moments`).on('click', () => {
    dropdownHandler(moment);
  });
});

const sensorsDropdownHandler = (sensorId, all) => {
  if (!all) {
    document.querySelector('#sensorBtn').innerText = `Sensor ${sensorId}`;
    stats = getStatsOfSensor(data.data, sensorId);
  } else {
    document.querySelector('#sensorBtn').innerText = `All Sensors`;
    stats = data.data;
  }
  currentSensor = sensorId;
  updateCharts();
};

const dropdownHandler = (numberOfEntries) => {
  lineMoments = numberOfEntries;
  barMoments = numberOfEntries;
  document.querySelector(
    '#lineDropdown'
  ).innerText = `Show ${numberOfEntries} entries`;
  if (currentSensor) stats = getStatsOfSensor(data.data, currentSensor);
  else stats = data.data;
  updateCharts();
};

const updateCharts = () => {
  if (stats.length <= barMoments) {
    if (stats.length <= lineMoments) {
      lineChartStats = stats;
    } else {
      lineChartStats = stats.slice(-lineMoments);
    }
  } else {
    stats = stats.slice(-barMoments);
    lineChartStats = stats.slice(-lineMoments);
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
