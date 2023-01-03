export const processedChart = (chart, stats, legend) => {
  if (chart.data.datasets.length > 0) chart.data.datasets = [];
  Object.entries(legend[0]).forEach(([key, value]) => {
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
  });
  chart.data.labels = stats.map((obj) => obj.moment.split(' ')[1]);
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
        // barPercentage: 0.5,
        // barThickness: 6,
        // maxBarThickness: 8,
        // minBarLength: 2,
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(255, 205, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(201, 203, 207, 0.2)',
        // ],
        // borderColor: [
        //   'rgb(255, 99, 132)',
        //   'rgb(255, 159, 64)',
        //   'rgb(255, 205, 86)',
        //   'rgb(75, 192, 192)',
        //   'rgb(54, 162, 235)',
        //   'rgb(153, 102, 255)',
        //   'rgb(201, 203, 207)',
        // ],
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
        //   text: 'Multi Statistics',
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
