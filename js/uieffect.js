$(function(){

  var _html = $('html');
  var _body = $('body');
  var _window = $(window);

  var ww = _window.width();
  var wh = _window.height();
  var wwNew = ww;

  const wwSlim = 480;
  const wwMedium = 700; //此值以下是手機
  const wwNormal = 960;  //此值以上是電腦
  const wwMaximum = 1200;

  var _menu = $('.webHeader .menu');
  var _sidebar = $('.sidebar');
  var _sidebarCtrl = $('.sidebarCtrl');
  var _webHeader = $('.webHeader');
  var _webFooter = $('.webFooter');

  _html.removeClass('no-js');

  // --------------------- 外掛套件 slick 參數設定
  // 首頁大圖輪播
  $('.bigBanner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 800,
    autoplay: true,
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
    zIndex:8
  });


  // 首頁小 banner 輪播（文化藝術）
  $('.bannerloop').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 600,
    autoplay: true,
    arrows: true,
    dots: false,
    fade: false,
    infinite: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
        }
      }
    ]

  });
  // --------------------- slick 參數設定：結束



  // /////////// font size 和 cookie ///////////////
  // font size：顯示所選項目
  var _fontSize = $('.fontSize');
  var _fontSizeBtn = _fontSize.find('button');
  var _main = $('.main');


  _fontSizeBtn.click(function(){
    $(this).parent().addClass('active').siblings().removeClass('active');
    let fontClass = $(this).attr('class');
    _main.removeClass('largeFont mediumFont smallFont').addClass(fontClass);
    createCookie('FontSize', fontClass , 365);
  })

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
    // else expires = '';
    // document.cookie = name + '=' + value + expires + '; path=/';
  }

  function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  window.onload = function () {
    var cookie = readCookie('FontSize');

    _main.removeClass('largeFont mediumFont smallFont').addClass(cookie);
    _fontSizeBtn.filter( function() {
      return $(this).attr( "class" ) === cookie;
    }).parent().addClass('active').siblings().removeClass('active');
  }
  ///////////// font size 和 cookie 結束 ///////////////










  // 可收合區
  _drawer = $('.drawer');
  _drawer.each(function () {
    let _this = $(this);
    let _handle = _this.find('.handle');
    let _tray = _this.find('.tray');
    const speed = 500;

    _handle.click(function () {
      if (_tray.is(':hidden')) {
        _tray.stop(true, false).slideDown(speed);
        _handle.removeClass('openIt');
      } else {
        _tray.stop(true, false).slideUp(speed, function(){
          _handle.addClass('openIt');
        })
      }
    })
  })


  // rwd Table
  // 把 th 的內容複製到對應的td的 data-th 屬性值
  _rwdTable = $('.rwdTable');
  _rwdTable.each( function(){
    let _this = $(this);
    let _th = _this.find('thead>tr>th');
    let count = _th.length;
    let _tr = _this.find('tbody').children('tr');

      _tr.each(function(){
        let _td = $(this).children('td');
        for ( let i = 0; i<count; i++ ) {
          _td.eq(i).attr('data-th', _th.eq(i).text());
        }
      })
  })






  //////////////////////////////////////////////
  // 燈箱 ---------------------------------------
  var _lightbox = $('.lightbox');
  var _hideLightbox = _lightbox.find('.closeThis');
  const lbxSpeed = 400;

  _lightbox.before('<div class="coverAll"></div>');
  _lightbox.append('<button type="button" class="skip"></button>');
  var _cover = $('.coverAll');
  var _skipToClose = _lightbox.find('.skip');

  _skipToClose.focus( function () {
    _hideLightbox.focus();
  })

  // 關燈箱
  _hideLightbox.click(function(){
    let _targetLbx = $(this).parents('.lightbox');
    _targetLbx.stop(true, false).fadeOut(lbxSpeed,
      function(){
        _cpBigPhoto.find('.flowList').find('li').hide();
      }
    );
    _targetLbx.prev(_cover).fadeOut(lbxSpeed);
    _body.removeClass('noScroll');
  })

  _cover.click(function(){
    let _targetLbx = $(this).next('.lightbox');
    $(this).fadeOut(lbxSpeed);
    _body.removeClass('noScroll');
    _targetLbx.stop(true, false).fadeOut(lbxSpeed,
      function(){
        _cpBigPhoto.find('.flowList').find('li').hide();
      }
    );
  })


  //////////////////////////////////////
  // .photoflow：cp頁的相關圖片（Related Photos）
  // 點擊圖片要開燈箱並顯示大圖
  var _photoflow = $('.photoflow');
  var _cpBigPhoto = $('.lightbox.bigPhotos');
  var photoIndex;
  
  _photoflow.each(function () {
    let _this = $(this);
    let _floxBox = _this.find('.flowBox');
    let _flowList = _floxBox.find('.flowList');
    let _flowItem = _flowList.children('li');
    let slideDistance = _flowItem.first().outerWidth(true);
    let slideCount = _flowItem.length;
    let _btnRight = _this.find('.diskBtn.next');
    let _btnLeft = _this.find('.diskBtn.prev');
    const speed = 400;
    const actClassName = 'active';
    let i = 0;
    let j;
    let _dots = '';

    // 產生 indicator 和 自訂屬性 data-index
    _floxBox.append('<div class="flowNav"><ul></ul></div>');
    let _indicator = _this.find(".flowNav>ul");
    for (let n = 0; n < slideCount; n++) {
      _dots = _dots + '<li></li>';
      _flowItem.eq(n).attr('data-index', n);
    }
    _indicator.append(_dots);

    // 複製到燈箱中 *** //
    _floxBox.clone().insertBefore(_skipToClose);

    let _indicatItem = _indicator.find('li');
    _indicatItem.eq(i).addClass(actClassName);
    _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);


    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady() {
      _indicatItem.removeClass(actClassName);
      _indicatItem.eq(i).addClass(actClassName);
      // _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
      if (ww < wwMedium) {
        if (slideCount > 1) {
          flownavShow();
        } else {
          flownavHide();
        }
      }
      if (ww >= wwMedium) {
        if (slideCount <= 2) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
          // _indicatItem.eq((i + 2) % slideCount).addClass(actClassName);
        }
      }
      if (ww >= wwNormal) {
        if (slideCount <= 4) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 2) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 3) % slideCount).addClass(actClassName);
        }
      }
    }
    function flownavShow(){
      _indicator.add(_btnRight).add(_btnLeft).show();
    }
    function flownavHide(){
      _indicator.add(_btnRight).add(_btnLeft).hide();
    }

    function slideForward(){
      _flowList.stop(true, false).animate({'margin-left': -1 * slideDistance }, speed, function(){
        j = (i + 1) % slideCount;
        _flowItem.eq(i).appendTo(_flowList);
        _indicatItem.eq(i).removeClass(actClassName);
        _indicatItem.eq(j).addClass(actClassName);
        _flowList.css('margin-left', 0);
        if (ww >= wwMedium) {
          _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
        }
        if (ww >= wwNormal) {
          _indicatItem.eq((j + 3) % slideCount).addClass(actClassName);
        }
        i = j;
      });
    }
    function slideBackward() {
      j = (i - 1) % slideCount;
      _flowItem.eq(j).prependTo(_flowList);
      _flowList.css("margin-left", -1 * slideDistance);

      _flowList.stop(true, false).animate({ "margin-left": 0 }, speed, function () {
          _indicatItem.eq(j).addClass(actClassName);
          if (ww >= wwNormal) {
            _indicatItem.eq((i + 3) % slideCount).removeClass(actClassName);
          } else if (ww >= wwMedium) {
            _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
          } else {
            _indicatItem.eq(i).removeClass(actClassName);
          }
          i = j;
        });
    }

    // 點擊向右箭頭
    _btnRight.click(function () { slideForward(); });

    // 點擊向左箭頭
    _btnLeft.click(function () { slideBackward(); });

    // touch and swipe 左右滑動
    _floxBox.swipe({
      swipeRight: function () {slideBackward();},
      swipeLeft: function () {slideForward();},
      threshold: 20,
    });




    /////////////////************************** *//
    // 點擊.photoflow的圖片，開燈箱顯示大圖
    _flowItem.children('a').click(function(){
      photoIndex = $(this).parent().attr('data-index');
      //console.log(photoIndex);
      _cpBigPhoto.stop(true, false).fadeIn().find('.flowList').find('li').filter( function(){
        return $(this).attr('data-index') == photoIndex;
      }).show();
      _hideLightbox.focus();
      _cover.stop(true, false).fadeIn();
    })

    let winResizeTimer;
    _window.resize(function () {
      clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(function () {
        ww = _window.width();
        slideDistance = _flowItem.first().outerWidth(true);
        indicatReady();
      }, 200);
    });

  });



  // cp 頁大圖燈箱
  _cpBigPhoto.each(function(){
    let _this = $(this);
    let _photoBox = _this.find('.flowBox');
    let _photoList = _photoBox.find('.flowList');
    let _photoItem = _photoList.children('li');
    let photoCount = _photoItem.length;
    let _btnRight = _this.find('.diskBtn.next');
    let _btnLeft = _this.find('.diskBtn.prev');
    const speed = 400;
    let i, j;

    _photoItem.hide();

    // 點擊向右箭頭
    _btnRight.click(function(){
      i = Number( _photoItem.filter(':visible').attr('data-index') );
      j = (i+1) % photoCount;

      // console.log(i, j);

      _photoItem.filter( function(){
        return $(this).attr('data-index') == i;
      }).stop(true, false).fadeOut(speed, function(){
        $(this).hide();
      });
      _photoItem.filter( function(){
        return $(this).attr('data-index') == j;
      }).stop(true, false).fadeIn(speed);
    })
    
    // 點擊向左箭頭
    _btnLeft.click(function(){
      i = Number(_photoItem.filter(':visible').attr('data-index'));
      j = (i-1+photoCount) % photoCount;

      _photoItem.filter(function(){
        return $(this).attr('data-index') == i;
      }).stop(true, false).fadeOut(speed, function(){
        $(this).hide();
      });
      _photoItem.filter( function(){
        return $(this).attr('data-index') == j;
      }).stop(true, false).fadeIn(speed);
    })
  })


  // 製作側欄選單遮罩
  _body.append('<div class="sidebarMask"></div>');

  // 找出_menu中有次選單的li
  _menu.find('li').has('ul').addClass('hasChild');



  // 寬版主選單 -----------------------------------------------------
  _menu.each( function(){
    let _this = $(this);
    let _hasChild = _this.find('.hasChild');
    let _topItem = _this.children('ul').children('li');
    let _hasChildA = _hasChild.children('a');
    let liA = _this.find('li>a');
    
    _hasChild.hover(
      function(){
        let _this = $(this);
        let _thisSubMenu = _this.children('ul');

        if ( _this.is(_topItem) ) {
          _thisSubMenu.stop(true, false).slideDown(300);
        } else {
          // let _thisSubMenu = $(this).children('ul');
          _this.addClass('here');
          if ( _this.offset().left + _this.innerWidth() + _thisSubMenu.innerWidth() > _window.innerWidth()) {
            _thisSubMenu.css( 'left', -1*(_thisSubMenu.innerWidth()) );
          } else {
            _thisSubMenu.css('left', _thisSubMenu.parent().innerWidth());
          }
          _thisSubMenu.stop(true, false).slideDown(300);
        }
      },
      function(){
        $(this).removeClass('here').children('ul').stop(true, false).slideUp(200, function(){
          $(this).removeAttr('style');
        });
      }
    );
    
    _hasChildA.focus(function(){
      let _this = $(this);
      let _thisSubMenu = $(this).next('ul');

      if ( _this.parent().is(_topItem) ) {
        _thisSubMenu.show();
      } else {
        if (_this.parent().offset().left + _this.innerWidth() + _thisSubMenu.innerWidth() > _window.innerWidth()) {
          _thisSubMenu.css('left', -1*(_thisSubMenu.innerWidth()) );
        } else {
          _thisSubMenu.css('left', _thisSubMenu.parent().innerWidth());
        }
        _thisSubMenu.show();
      }
      _this.parent().addClass('here');
    })

    liA.focus(function(){
      $(this).parent('li').siblings().removeClass('here').find('ul').hide();
    })


  })




  // 行動版側欄選單
  // 複製「主選單」到側欄給行動版用
  _menu.clone().prependTo(_sidebar);
  $('.topLinks').clone().appendTo(_sidebar);
  var _sidebarMenu = _sidebar.find('.menu');
  var _hasChild = _sidebarMenu.find('.hasChild>a');
  var _sidebarMask = $('.sidebarMask');
  _hasChild.click(
    function(e){
      e.preventDefault();

      let _this = $(this);
      let _subMenu = _this.next('ul');

      if (_subMenu.is(':hidden')) {
        _subMenu.stop(true, false).slideDown();
        _this.parent().addClass('closeIt').siblings().removeClass('closeIt').find('ul:visible').slideUp().parent().removeClass('closeIt');
      } else {
        _subMenu.stop(true, false).slideUp().find('ul:visible').slideUp();
        _subMenu.find('.closeIt').removeClass('closeIt');
        _this.parent().removeClass('closeIt');
      }
    }
  )


  _sidebarCtrl.click(function(){
    if (_sidebar.hasClass('reveal')) {
      _sidebar.removeClass('reveal');
      _sidebarCtrl.removeClass('closeIt');
      _sidebarMask.fadeOut(400);
      _body.removeClass('noScroll');
    } else {
      _sidebar.addClass('reveal');
      _sidebarCtrl.addClass('closeIt');
      _sidebarMask.fadeIn(400);
      _body.addClass('noScroll')
    }
  })
  _sidebarMask.click(function(){
    _sidebar.removeClass('reveal');
    _sidebarCtrl.removeClass('closeIt');
    _body.removeClass('noScroll');
    $(this).fadeOut(400);
  })

  let winResizeTimer0;
  _window.resize(function () {
    clearTimeout(winResizeTimer0);
    ww = _window.width();
    winResizeTimer = setTimeout(function () {
      if(ww >= wwNormal) {
        _sidebarMask.hide();
        _body.removeClass('noScroll');
        _sidebar.removeClass('reveal');
        _sidebarCtrl.removeClass('closeIt');
      } else {
        _menu.hide().removeAttr('style');
      }
    }, 200);
  });



  // 查詢區開合 -----------------------------------------------------
  var _searchCtrl = $('.searchCtrl');
  var _search = $('.search');
  const srSpeed = 510;
  _searchCtrl.click(function(){
    if( _search.hasClass('reveal')) {
      _search.removeClass('reveal');
      setTimeout(function(){_search.removeAttr('style')}, srSpeed);
    } else {
      _search.css('display', 'flex');
      setTimeout (function(){ _search.addClass('reveal')}, 10);
      // _search.show(0, function(){
      // });
      // .addClass('reveal');
      // _search.addClass('reveal', function(){
      //   _search.show().addClass('reveal');
      //   setTimeout (function(){_search.find('input[type="text"]').focus()}, srSpeed);
      // });
    }
  })
  // _search.find('input[type="text"]').focus(function(){
  //   _search.css('transform', ' translateX(0)');
  // })

  // --end of-- 查詢區 -----------------------------------------------------


  // fatfooter 開合 -----------------------------------------------------
  var _fatFootCtrl = $('.fatFootCtrl');
  var _footSiteTree = $('.fatFooter').find('.siteTree>ul>li>ul');
  const text1 = _fatFootCtrl.text();
  const text2 = _fatFootCtrl.attr('data-altText');

  _fatFootCtrl.click(function(){
    if ( _footSiteTree.is(':visible')) {
      _footSiteTree.slideUp();
      $(this).addClass('closed').text(text2);
    } else {
      _footSiteTree.slideDown();
      $(this).removeClass('closed').text(text1);
    }
  })
  // --end of-- fatfooter 開合 -----------------------------------------------------


  // 向上捲動箭頭 -----------------------------------------------------
  var _goTop = $('.goTop');

  _goTop.click(function(){
    _html.stop(true,false).animate({scrollTop: 0}, 800);
  });

  _window.scroll(function () {
    if (_window.scrollTop() > 200) {
      _goTop.addClass('show');
    } else {
      _goTop.removeClass('show');
    }
  });
  // --end of-- 向上捲動箭頭 -----------------------------------------------------






  // ======================================================================

  // 頁籤，March 2022 新做  ////////////////////////////
  var _tabset = $('.tabset');
  _tabset.each(function(){
    let _this = $(this);
    let _tabItems = _this.find('.tabItems');
    let _tabButton = _tabItems.find('button');
    let _tabContent = _this.find('.tabContent');
    let i = _tabButton.filter('.active').index();

    _tabContent.not(':last').append('<button class="skip"></button>')
    let _skip = _tabContent.find('.skip');
    
    _tabContent.eq(i).show();
    _tabButton.attr('tabindex' , '-1' ).eq(i).attr('tabindex' , '0' );

    _tabButton.on('click' , function(){
      i = $(this).index();
      $(this).addClass('active').attr('tabindex' , '0' ).siblings().removeClass('active').attr('tabindex' , '-1' );
      _tabContent.hide().eq(i).show();
    })

    _skip.on('focus', function(){
      _tabButton.eq( $(this).parent().index() ).focus();
    })

    _tabButton.on('focus', function(){
      $(this).trigger('click');
    })
  })


})