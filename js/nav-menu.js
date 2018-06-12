(function(){
  $(function(){
    var viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // var WINDOW = $(window);
    if(viewWidth  >= 992){
      $('#nav').addClass('active');
    }
    $('body').on('click','#toggle-menu',function(){
      $('#nav').toggleClass('active');
    });
  });
})($)