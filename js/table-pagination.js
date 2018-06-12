(function(){
  var viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var tr_type ='all';
  $('li[data-type="meeting"] span').text($('#content tbody tr.meeting').length);
  $('li[data-type="car"] span').text($('#content tbody tr.car').length);
  $('li[data-type="all"] span').text($('#content tbody tr').length);
  $('body').on('click','.breadcrumb li a',function(e){
    e.preventDefault();
    var $li = $(this).closest('li');
    tr_type = $li.attr('data-type');
    $li.addClass('active').siblings().removeClass('active');
    if(tr_type !== 'all'){
      $('#content').find('.table tbody tr').hide();
      $('#content').find('.table tbody tr.'+tr_type).show();
    }else{
      $('#content').find('.table tbody tr').show();
    }
    pagination();
    return false;
  });
  pagination();
  heightControl();
  function pagination(){
    $('.table-cover').each(function(){
      var $this = $(this);
      $this.find('nav.d-table').remove();
      if($this.find('.table').length){
        if(tr_type !== 'all'){
          var tr = $this.find('.table tbody tr.'+tr_type);
        }else{
          var tr = $this.find('.table tbody tr');
        }
        var tr_length = tr.length;
        if($this.find('header').length){
          $this.find('header span').text(tr_length);
        }
        if(tr_length>5){
          var page_length = Math.ceil(tr_length / 5);
          tr.slice(5).hide();
          $this.append('<nav aria-label="Page navigation" class="d-table mx-auto pt-2"><ul class="pagination"></ul></nav>');
          $this.find('.pagination').append('<li class="page-item"><a class="page-link prev" href="#">«上一頁</a></li>');
          for(var i=1;i<=page_length;i++){
            $this.find('.pagination').append('<li class="page-item"><a class="page-link page" href="#">'+i+'</a></li>');
          }
          $this.find('.pagination').append('<li class="page-item"><a class="page-link next" href="#">下一頁»</a></li>');
          $this.find('.page').closest('li').eq(0).addClass('active');
          page_show();

          function page_show(){
            var $li = $this.find('.pagination li');
            var $act = $this.find('.pagination li.active');
            // var $act_num = Number($act.find('a').text());
            $li.hide();
            $li.last().show();
            $li.first().show();
            $li.eq(1).show();
            $li.last().prev().show();
            $act.show();
            $act.nextAll(':lt(2)').show();
            // $act.prev('li').show().prev('li').show();
            $act.prevAll(':lt(2)').show();
          }
          $this.find('.page').on('click',function(){
            var page_num = $(this).text();
            var li = $(this).closest('li');
            // li.hide();
            li.addClass('active').siblings().removeClass('active');
            // $this.find('.page').closest('li').hide();
            // $this.find('.pagination li').eq(1).show();
            // $this.find('.pagination li').eq(page_num-1).show();
            // li.show();
            // li.nextAll(':lt(2)').show();
            // li.prevAll(':lt(2)').show();
            $this.find('.table tbody').scrollLeft(0);
            page_show();
            tr.hide();
            tr.slice((page_num-1)*5,page_num*5).show();
            return false;
          });
          $this.find('.prev').on('click',function(){
            var active = $this.find('.pagination li.active');
            var page_num = Number(active.find('a').text())-1;
            if(page_num>=1){
              active.removeClass('active').prev('li').addClass('active');
              $this.find('.table tbody').scrollLeft(0);
              page_show();
              tr.hide();
              tr.slice((page_num-1)*5,page_num*5).show();
            }
            return false;
          });
          $this.find('.next').on('click',function(){
            var active = $this.find('.pagination li.active');
            var page_num = Number(active.find('a').text())+1;
            if(page_num <= page_length){
              active.removeClass('active').next('li').addClass('active');
              $this.find('.table tbody').scrollLeft(0);
              page_show();
              tr.hide();
              tr.slice((page_num-1)*5,page_num*5).show();
            }
            return false;
          });
        }
      }
    });
  }
  function heightControl(){
    viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    $('.table-cover').each(function(){
      var $this = $(this);
      if(viewWidth < 992){
        var th_num = $this.find('thead th').length;
        for(var i=0;i<th_num;i++){
          $this.find('thead th').eq(i).css('height','');
          $this.find('tbody tr').each(function(){
            $(this).find('td').eq(i).css('height','');
          });
          var temp=[];
          var maxThHeight = Math.max.apply(null, $this.find('thead th').eq(i).map(function(){
            return $(this).outerHeight();
          }).get());
          var each_tr = $this.find('tbody tr').each(function(){
            temp.push($(this).find('td').eq(i).outerHeight());
          })
          var maxTdHeight = Math.max.apply(null, temp);
          var maxHeight = Math.max(maxThHeight,maxTdHeight)/16;
          $this.find('thead th').eq(i).css('height',maxHeight+'rem');
          $this.find('tbody tr').each(function(){
            $(this).find('td').eq(i).css('height',maxHeight+'rem');
          });
        }
      }else{
        $this.find('thead th').css('height','');
        $this.find('tbody tr').each(function(){
          $(this).find('td').css('height','');
        });
      }
    })
  }
  $(window).resize(function(){
    heightControl();
  });

  // if(viewWidth < 992){
  //   var currentX,sl,tw;
  //   $(document).on('touchstart','.table tbody', function (e){
  //     sl = $(this).scrollLeft();
  //     currentX = e.originalEvent.touches[0].clientX;
  //     tw = $(this).find('tr').outerWidth()+4;
  //   })
  //   $(document).on('touchend','.table tbody', function (e){
  //     var endX = e.originalEvent.changedTouches[0].clientX;
  //     var $this = $(this);
  //     if(currentX > endX+15){
  //       // $this.scrollLeft(sl+tw);
  //       $this.animate({scrollLeft: sl+tw}, 200);
  //     }else if(currentX < endX+15){
  //       // $this.scrollLeft(sl-tw);
  //       $this.animate({scrollLeft: sl-tw}, 200);
  //     }
  //   })
  // }
})($)