export function ScriptInjector() {
  var scriptList = [
    '/plugins/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.5/waypoints.min.js',
    '/bootstrap/js/bootstrap.min.js',
    '/plugins/modernizr.js',
    '/plugins/isotope/isotope.pkgd.min.js',
    '/plugins/jquery.backstretch.min.js',
    '/plugins/jquery.appear.js',
    '/js/template.js',
    '/js/jquery.countTo.js',
    '/js/jquery.lightbox.min.js',
    '/slick/slick.min.js',
    '/js/custom.js',
    'https://cdn.rawgit.com/dwyl/learn-to-send-email-via-google-script-html-no-server/master/form-submission-handler.js'
  ];
  for (let i = 0; i < scriptList.length; i++) {
    const script = document.createElement('script');
    script.src = scriptList[i];
    script.async = false;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }
}
