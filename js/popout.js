$(function(){
  $('body').on('click','.popout',function(e){
    e.preventDefault();
    var urlPath = $(this).attr('data-urlpath');
    $.ajax({
      type: "GET",
      url: urlPath,
      cache:false
    })
    .done(function(d){
      $('#popout').remove()
      $('body').append('<div id="popout"><div id="popout-content"><header></header></div></div>');
      $('#popout-content').append(d);
      $('#popout').fadeIn();
      $('body').addClass('act');
      popFadeOut();
    })
    .fail(function(jqXHR,exception){
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }
      console.log(jqXHR.responseText)
    })
    return false;
  // }
    function popFadeOut(){
      $('body').on('click','#popout', function(e) {
        if (e.target !== this)
        return;

        $('#popout').fadeOut();
        $('body').removeClass('act');
      });
      $('body').on('click','#popout header', function(e) {
        $('#popout').fadeOut();
        $('body').removeClass('act');
      });
    }
  })
});