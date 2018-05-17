/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Place here your custom scripts
 */

$(document).ready(function () {

  $('.email-submit').click(function () {
    var button = $('.email-success')
    setTimeout(function () {
      button.css('display', 'block')
    }, 2000)
  })


  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     $('.js-counter').text('2500');
  }else{
      $('#gtco-counter').waypoint(function(){


          $('.to-do').countTo({
              from: 1,
              to: 2500,
              speed: 3000,
              refreshInterval: 50,
              formatter: function (value, options) {
                return value.toFixed(options.decimals);
              },
              onUpdate: function (value) {
                console.debug(this);
              },
              onComplete: function (value) {
                console.debug(this);
              }
          });

          $('.to-do').removeClass('to-do');
      },{offset: '100%'});
  }





})
