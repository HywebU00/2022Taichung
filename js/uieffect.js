$(function(){

  var _html = $('html');
  var _body = $('body');
  var _window = $(window);

  var ww = _window.width();
  // var wh = _window.height();
  // var wwNew = ww;

  // const wwSlim = 480;
  // const wwMedium = 700; //此值以下是手機
  const wwNormal = 1000;  //此值以上是電腦
  // const wwMaximum = 1200;

  var _menu = $('.webHeader .menu');
  var _sidebar = $('.sidebar');
  var _sidebarCtrl = $('.sidebarCtrl');
  var _webHeader = $('.webHeader');
  // var _webFooter = $('.webFooter');
  
  _html.removeClass('no-js');

  // 外掛套件 slick 參數設定 ////////////////////////////
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
  $('.banners').find('.bannerloop').slick({
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

    // 首頁：８Ｘ４ banner 輪播（2023Jan 新增）
    $('.banner8x4').find('.bannerloop').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      speed: 600,
      autoplay: false,
      arrows: true,
      dots: true,
      centerPadding: 0,
      fade: false,
      infinite: true,
      mobileFirst: true
  
    });
  // slick 參數設定：結束 ////////////////////////////



  // font size 和 cookie ////////////////////////////
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
  // font size 和 cookie 結束 ////////////////////////////





  // 固定版頭 ////////////////////////////
  var hh = _webHeader.innerHeight();
  function fixHeader(){
    if (_window.scrollTop() > hh ) {
      _webHeader.addClass('fixed');
      _body.offset( {top : hh});
    } else {
      _webHeader.removeClass('fixed');
        _body.offset({top : 0})
    }
  }

  // 清除固定版頭時產生的 style 屬性
  function fxH_clearStyle() {
    _webHeader.removeClass('fixed');
    _body.removeAttr('style');
  }

  if (ww >= wwNormal) {
    _window.on('scroll.fixHeader' , fixHeader);
  } else {
    _window.off('.fixHeader');
    fxH_clearStyle();
  }




  // 可收合區 ////////////////////////////
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
  ////////////////////////////////////////////////////////

  // rwd Table ////////////////////////////
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
  ////////////////////////////////////////////////////////






  //////////////////////////////////////////////
  // 燈箱 ////////////////////////////
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
    _targetLbx.stop(true, false).fadeOut(lbxSpeed);
    _targetLbx.prev(_cover).fadeOut(lbxSpeed);
    _body.removeClass('noScroll');
  })

  _cover.click(function(){
    let _targetLbx = $(this).next('.lightbox');
    $(this).fadeOut(lbxSpeed);
    _body.removeClass('noScroll');
    _targetLbx.stop(true, false).fadeOut(lbxSpeed);
  })






  // 寬版主選單 _menu ////////////////////////////
  // 找出_menu中有次選單的li
  _menu.find('li').has('ul').addClass('hasChild');
  // 寬版主選單 ////////////////////////////
  var _hasChild = _menu.find('.hasChild');
  var _hasChildA = _hasChild.children('a');
  var _topItem = _menu.children('ul').children('li');
  var liA = _menu.find('li>a');

  _hasChild.each(function(){
    let _this = $(this);
    let _thisSubMenu = _this.children('ul');
    let _xBotton;

    _this.hover(
      function(){
        let offset1 = _window.scrollTop() + _window.height();
        let offset2;
        let translate = '';
        let dd = 0;
        let disB = 0;

        _this.addClass('here');

        if ( _this.is(_topItem) ) {
          if ( _this.offset().left + _thisSubMenu.innerWidth() > _window.innerWidth()) {
            _thisSubMenu.css( {'left': 'auto', 'right': 0} );
          } else {
            _thisSubMenu.css('left', 0);
          }
        } else {
          if ( _this.offset().left + _this.innerWidth() + _thisSubMenu.innerWidth() > _window.innerWidth()) {
            _thisSubMenu.css( 'left', -1*(_thisSubMenu.innerWidth()) );
          } else {
            _thisSubMenu.css('left', _thisSubMenu.parent().innerWidth());
          }
        }

        _thisSubMenu.stop(true, true).slideDown(300, function(){
          offset2 = parseInt(_thisSubMenu.offset().top + _thisSubMenu.innerHeight());
          const itemHeight = _thisSubMenu.find('li:first-child').innerHeight();

          if (offset2 > offset1) {
            if (_thisSubMenu.innerHeight() <= _window.height()) {
              translate = 'translateY(' + String( offset1 - offset2 ) + 'px)';
            } else {
              translate = 'translateY(' + String( _window.scrollTop() - _thisSubMenu.offset().top ) + 'px)';

              // 加入控制 button -------------------------------------
              _this.append('<button class="xButton" type="button"></button>');
              _xBotton = _this.find('.xButton');
              _xBotton.css('left', _thisSubMenu.offset().left + _thisSubMenu.width());

              // disB = 選單高度 - 視窗高度
              disB =  _thisSubMenu.innerHeight() - _window.height();
            }
            _thisSubMenu.css('transform', translate );

            _xBotton.click(function(){
              if ( dd + disB > 0) {
                dd = dd - itemHeight;
                if (dd + disB < itemHeight) { dd = dd - disB%itemHeight;}
                _thisSubMenu.stop(true, false).animate({'margin-top': dd}, 200);
              }
            })
          };
        });
      },
      function(){
        _this.removeClass('here').find('.xButton').remove();
        _thisSubMenu.stop(true, false).slideUp(200, function(){
          $(this).removeAttr('style');
        });
      }
    );
    
  })
  
  // 鍵盤操作 
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


  // 離開 _menu 隱藏所有次選單
  $('*').focus(function(){
    if( $(this).parents('.menu').length == 0 ){
      _menu.find('.hasChild').removeClass('here').find('ul').removeAttr('style');
    }
  })


  // 行動版側欄選單 //////////////////////////////
  // 製作側欄選單遮罩
  _body.append('<div class="sidebarMask"></div>');

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
      if(ww >= wwNormal ) {
        _window.on('scroll.fixHeader' , fixHeader);
        if (_sidebar.hasClass('reveal')) {
          _sidebarMask.hide(10, function(){
            _body.removeClass('noScroll');
          });
          _sidebar.removeClass('reveal');
          _sidebarCtrl.removeClass('closeIt');
        }
      } else {
        _window.off('.fixHeader');
        fxH_clearStyle();
      }
    }, 200);
  });



  // 查詢區開合 //////////////////////////////
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
    }
  })

  // --end of-- 查詢區 //////////////////////////////


  // 按 altKey + s 要 focus 查詢 input 元件 //////////////////////////////
  _window.keydown( function(e){
    if (e.which == 83 && e.altKey ) {
      if (_window.scrollTop() > hh) {
        _html.stop(true,false).animate({scrollTop: 0}, 400, function(){
          _search.find('input[type="text"]').focus();
        });
      }
    }
  })
  // --end of--  altKey + s //////////////////////////////////////////////



  // fatfooter 開合 //////////////////////////////
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
  // --end of-- fatfooter 開合 //////////////////////////////


  // 向上捲動箭頭 //////////////////////////////
  var _goTop = $('.goTop');

  _goTop.click(function(){
    _html.stop(true,false).animate({scrollTop: 0}, 800, function(){
      $('.goCenter').focus();
    });
  });

  _window.scroll(function () {
    if (_window.scrollTop() > 200) {
      _goTop.addClass('show');
    } else {
      _goTop.removeClass('show');
    }
  });
  // --end of-- 向上捲動箭頭 //////////////////////////////




  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  // 頁籤，March 2022 新做  ////////////////////////////
  // var _tabset = $('.tabset');
  // _tabset.each(function(){
  //   let _this = $(this);
  //   let _tabItems = _this.find('.tabItems');
  //   let _tabButton = _tabItems.find('button');
  //   let _tabContent = _this.find('.tabContent');
  //   let i = _tabButton.filter('.active').index();

  //   _tabContent.not(':last').append('<button class="skip"></button>')
  //   let _skip = _tabContent.find('.skip');
    
  //   _tabContent.eq(i).show();
  //   _tabButton.attr('tabindex' , '-1' ).eq(i).attr('tabindex' , '0' );

  //   _tabButton.on('click' , function(){
  //     i = $(this).index();
  //     $(this).addClass('active').attr('tabindex' , '0' ).siblings().removeClass('active').attr('tabindex' , '-1' );
  //     _tabContent.hide().eq(i).show();
  //   })

  //   _skip.on('focus', function(){
  //     _tabButton.eq( $(this).parent().index() ).focus();
  //   })

  //   _tabButton.on('focus', function(){
  //     $(this).trigger('click');
  //   })
  // })

	// 無障礙頁籤功能，修改 Shift + tab 
	function tabFun() {
		var activeClass = 'active'; // 啟動的 class
		var tabSet = $('.tabset');
    
		tabSet.each(function () {
			var _tabBtnBlock = $(this).find('.tabItems');
			var _tabBtn = _tabBtnBlock.find('button');
			var _tabBtnLength = _tabBtn.length;
			// let _tabContentBlock = $(this).find('.tabContentGroup');
			var _tabContent =  $(this).find('.tabContent');
      
			_tabBtn.removeClass(activeClass).eq(0).addClass(activeClass);
			_tabContent.eq(0).show();

      // console.log(_tabContent.eq(0).attr('title'));

			for (let i = 0; i < _tabBtnLength; i++) {
				(
					function (i) {
						var _this = _tabBtn.eq(i);
						var _thisContent = _tabContent.eq(i);
						var _thisPrevItem = _tabContent.eq(i - 1);
						var _itemAllA = _thisContent.find('[href], input'); //這一個頁籤內容所有a和input項目
						var _prevItemAllA = _thisPrevItem.find('[href], input'); //前一個頁籤內容所有a和input項目
						var _isFirstTab = i === 0; //如果是第一個頁籤
						var _isLastTab = i === _tabBtnLength - 1; //如果是最後一個頁籤
						var _itemFirstA = _itemAllA.eq(0); //頁籤內容第一個a或是input
						var _itemLastA = _itemAllA.eq(-1); //頁籤內容最後一個a或是input
						var _prevItemLastA = _prevItemAllA.eq(-1); //前一個頁籤的最後一個a或是input

						// _this頁籤觸發focus內容裡的第一個a
						_this.on('keydown', function (e) {
							//頁籤第幾個按鈕觸發時無
							if (e.which === 9 && !e.shiftKey) { // 如果按下 Tab，但沒有按著 shift
								e.preventDefault();
								startTab(i); //啟動頁籤切換功能
								if (_itemAllA.length) { // 如果 _itemAllA.length 不是 0（內容有至少一個 a 或 input）
									_itemFirstA.focus(); // 內容的第一個 a 或是 input focus
								} else {
									_tabBtn.eq(i + 1).focus(); // 當內容沒有 a 或是 input 跳下一個頁籤
								}
							} else if (e.which === 9 && e.shiftKey && !_isFirstTab) { // 如果按Tab，同時按著shift，且不是第一個頁籤
								e.preventDefault();
								startTab(i - 1); //啟動頁籤切換功能，切換到上一個頁籤

								if (_prevItemAllA.length) { // 如果前ㄧ個頁籤的內容有至少一個 a 或 input
									_prevItemLastA.focus(); // 前一個頁籤內容的最後一個a或是input focus
								} else { // 當內容沒有a或是input
									_tabBtn.eq(i - 1).focus(); // focus 上一個頁籤
								}
							}
						});

						// 當按下shift+tab且為該內容的第一個a或是input
						// 將focus目標轉回tab頁籤上，呼叫上方功能startTab(i - 1);往前一個頁籤
						_itemFirstA.on('keydown', function (e) {
							if (e.which === 9 && e.shiftKey) {
								e.preventDefault();
								_tabBtn.eq(i).focus();
							}
						});

						//當按下shift+tab且為該內容的最後一個a或是input，focus到下一個頁籤
						_itemLastA.on('keydown', function (e) {
							if (e.which === 9 && !e.shiftKey && !_isLastTab) {
								e.preventDefault();
								_tabBtn.eq(i + 1).focus();
							}
						});
					})(i);

				//滑鼠點擊事件
				_tabBtn.on('click', function (e) {
					e.preventDefault();
					var _nowBtn = $(this).index();
					startTab(_nowBtn);
				});

				//切換tab
				function startTab(_now) {
          // console.log(_now);
					_tabBtn.eq(_now).addClass(activeClass).siblings().removeClass(activeClass);
					_tabContent.hide().eq(_now).show();
				}
			}
		});
	}
	tabFun();

})