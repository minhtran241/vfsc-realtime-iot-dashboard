export const addTable = (data) => {
  const dataSet = data.map((obj) => Object.values(obj));
  if ($.fn.dataTable.isDataTable('#dataTable')) {
    table = $('#dataTable').DataTable({ retrieve: true });
    table.destroy();
  }
  $(document).ready(function () {
    $('#dataTable').DataTable({
      data: dataSet,
      autoWidth: true,
      columns: [
        { title: 'ID' },
        { title: 'Name' },
        { title: 'Lat' },
        { title: 'Lng' },
        { title: 'Time' },
        { title: 'UpT' },
        { title: 'BatV' },
        { title: 'SolV' },
        { title: 'STemp' },
        { title: 'WTs' },
        { title: 'WT' },
        { title: 'WPs' },
        { title: 'WP' },
        { title: 'WDs' },
        { title: 'WD' },
        { title: 'WNs' },
        { title: 'WN' },
        { title: 'Moment' },
      ],
    });
  });
};
