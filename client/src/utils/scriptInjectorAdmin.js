export function ScriptInjector() {
  var scriptList = [
    '/sb-admin/vendor/jquery/jquery.min.js',
    '/sb-admin/vendor/bootstrap/js/bootstrap.min.js',
    '/sb-admin/vendor/metisMenu/metisMenu.min.js',
    '/sb-admin/vendor/raphael/raphael.min.js',
    '/sb-admin/vendor/morrisjs/morris.min.js',
    '/sb-admin/data/morris-data.js',
    '/sb-admin/dist/js/sb-admin-2.js',
    '/sb-admin/vendor/datatables/js/jquery.dataTables.min.js',
    '/sb-admin/vendor/datatables-plugins/dataTables.bootstrap.min.js',
    '/sb-admin/vendor/datatables-responsive/dataTables.responsive.js',
    '/sb-admin/dataTableConfig.js'
  ];
  for (let i = 0; i < scriptList.length; i++) {
    const script = document.createElement('script');
    script.src = scriptList[i];
    script.async = false;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }
}
