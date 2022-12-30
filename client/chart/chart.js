export const processedChart = (chart, stats, legend) => {
  if (chart.data.datasets.length > 0) chart.data.datasets = [];
  Object.entries(legend[0]).forEach(([key, value]) => {
    chart.data.datasets.push({
      label: key,
      // fillColor: 'rgba(151,187,205,0.5)',
      // strokeColor: 'rgba(151,187,205,1)',
      pointBackgroundColor: 'rgba(151,187,205,1)',
      pointBorderColor: '#fff',
      axis: 'y',
      data: legend.map((obj) => obj[key]),
      fill: false,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(236, 183, 244, 0.2)',
        'rgba(34, 6, 107, 0.2)',
        'rgba(78, 229, 105, 0.2)',
        'rgba(162, 198, 0, 0.2)',
        'rgba(19, 72, 96, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(236, 183, 244)',
        'rgb(34, 6, 107)',
        'rgb(78, 229, 105)',
        'rgb(162, 198, 0)',
        'rgb(19, 72, 96)',
      ],
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
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };
  chart.data = data;
  return chart;
};
