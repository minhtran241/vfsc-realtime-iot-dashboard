export const addTable = (data) => {
  if ($.fn.dataTable.isDataTable('#dataTable')) {
    $('#dataTable').DataTable().clear().destroy();
  }
  $(document).ready(() => {
    $('#dataTable')
      .DataTable({
        data: data.map((obj) => Object.values(obj)),
        autoWidth: true,
        processing: true,
        autoFill: true,
        order: [['4', 'desc']],
        columns: Object.keys(data[0]).map((key) => ({
          title: key,
        })),
      })
      .draw();
  });
};
