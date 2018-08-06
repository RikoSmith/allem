/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Place here your custom scripts
 */

$(document).ready(function() {
  $('.email-submit').click(function() {
    var button = $('.email-success');
    setTimeout(function() {
      button.css('display', 'block');
      $('#gform').css('display', 'none');
    }, 2000);
  });

  var counterArray = [57, 116, 1572, 412745];

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $('.js-counter').text('2500');
  } else {
    $('#gtco-counter').waypoint(
      function() {
        $('.c-first').countTo({
          from: 1,
          to: counterArray[0],
          speed: 3000,
          refreshInterval: 50,
          formatter: function(value, options) {
            return value.toFixed(options.decimals);
          },
          onUpdate: function(value) {
            console.debug(this);
          },
          onComplete: function(value) {
            console.debug(this);
          }
        });

        $('.c-first').removeClass('c-first');

        $('.c-second').countTo({
          from: 1,
          to: counterArray[1],
          speed: 3000,
          refreshInterval: 50,
          formatter: function(value, options) {
            return value.toFixed(options.decimals);
          },
          onUpdate: function(value) {
            console.debug(this);
          },
          onComplete: function(value) {
            console.debug(this);
          }
        });
        $('.c-second').removeClass('c-second');

        $('.c-third').countTo({
          from: 1,
          to: counterArray[2],
          speed: 3000,
          refreshInterval: 50,
          formatter: function(value, options) {
            return value.toFixed(options.decimals);
          },
          onUpdate: function(value) {
            console.debug(this);
          },
          onComplete: function(value) {
            console.debug(this);
          }
        });
        $('.c-third').removeClass('c-third');

        $('.c-fourth').countTo({
          from: 1,
          to: counterArray[3],
          speed: 3000,
          refreshInterval: 50,
          formatter: function(value, options) {
            return value.toFixed(options.decimals);
          },
          onUpdate: function(value) {
            console.debug(this);
          },
          onComplete: function(value) {
            console.debug(this);
          }
        });
        $('.c-fourth').removeClass('c-fourth');
      },
      { offset: '100%' }
    );
  }

  $('.gallery a').lightBox();

  $('.gallery').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
  });
});
