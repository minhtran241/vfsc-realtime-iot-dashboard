export const processedChart = (chart, stats, legend) => {
  if (chart.data.datasets.length > 0) chart.data.datasets = [];
  legend.length > 0
    ? Object.entries(legend[0]).forEach(([key, value]) => {
        chart.data.datasets.push({
          label: key,
          borderWidth: 2,
          pointBackgroundColor: 'rgba(151,187,205,1)',
          pointBorderColor: '#fff',
          axis: 'y',
          data: legend.map((obj) => obj[key]),
          fill: false,
          tension: 0.1,
        });
      })
    : (chart.data.datasets = []);

  stats.length > 0
    ? (chart.data.labels = stats.map((obj) => obj.moment.split(' ')[1]))
    : (chart.data.labels = []);
  return chart;
};

export const barChart = (chart, stats, legend, key) => {
  // if (chart.data.datasets.length > 0) chart.data.datasets = [];
  const data = {
    labels: stats.map((obj) => obj.moment.split(' ')[1]),
    datasets: [
      {
        label: key,
        data: legend.map((obj) => obj[key]),
        borderWidth: 1,
      },
    ],
  };
  chart.data = data;
  return chart;
};

export const defaultBarChartConfig = () => {
  return {
    type: 'bar',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      indexAxis: 'y',
    },
  };
};

export const defaultLineChartConfig = () => {
  return {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        // title: {
        //   display: true,
        //   text: 'Line Chart',
        // },
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 10,
                lineHeight: 1,
              },
            },
          },
        },
        // layout: {
        //   padding: 0,
        // },
      },
      hover: {
        mode: 'index',
        intersec: false,
      },
    },
  };
};
