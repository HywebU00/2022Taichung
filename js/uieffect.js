$(function(){

  var _html = $('html');
  var _body = $('body');
  var _window = $(window);

  var ww = _window.width();
  // var wh = _window.height();
  var wwNew = ww;

  const wwSlim = 480;
  const wwMedium = 700; //此值以下是手機
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
    infinite: true,
    zIndex:8
  });

  // 首頁：小廣告圖輪播（文化藝術）
  $('.banners').find('.bannerloop').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 600,
    autoplay: true,
    arrows: true,
    dots: false,
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

  // 首頁：2x1 banner 輪播（2023Jan 新增）
  var _banner2x1Flow = $('.banner2x1').find('.flow');
  _banner2x1Flow.each( function(){
    let _this = $(this);
    if( _this.children('div').length == 1 ) {
      _this.children('div').clone().appendTo(_this);
    }
  });
  _banner2x1Flow.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    speed: 800,
    autoplay: true,
    arrows: true,
    dots: true,
    centerPadding: 0,
    infinite: true,
    mobileFirst: true

  });

  // 首頁：相簿輪播（2023Jan 新增）
  $('.albumsFlow').find('.flow').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    speed: 800,
    autoplay: true,
    arrows: true,
    dots: true,
    centerPadding: 0,
    infinite: true,
    mobileFirst: true
  });

  
  // 首頁：2023年版小廣告圖，
  // 桌機、平板版輪播，手機垂直展開
  var _bannersloop2 = $('.banners2').find('.bannerloop');
  var banners2Count = _bannersloop2.find('.loopItem').length;
  _bannersloop2.slick({
    vertical: true,
    slidesToShow: banners2Count,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 600,
    autoplay: false,
    arrows: false,
    dots: false,
    infinite: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 521,
        settings: {
          vertical: false,
          slidesToShow: 2,
          autoplay: true,
          arrows: true,
        }
      },
      {
        breakpoint: 760,
        settings: {
          vertical: false,
          slidesToShow: 3,
          autoplay: true,
          arrows: true,
        }
      }
    ]
  });


  // 相簿內頁
  var _photoSlide = $('.photoSlide');
  var _asNav = _photoSlide.find('.slider-nav');
  var _asNavFor = _photoSlide.find('.slider-for');
  _asNavFor.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: _asNav
  });
  _asNav.slick({
    variableWidth: true,
    slidesToShow: 3,  
    slidesToScroll: 1,
    centerPadding: 0,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: _asNavFor
  });

  // slick 參數設定：結束 ////////////////////////////

  // 計算相簿內容頁照片張數 ////////////////////////////
  _photoSlide.prepend('<div class="photoCount"><span class="current" title="目前位置"></span><span class="total" title="總張數"></span></div>');
  var _photoCount = _photoSlide.find('.photoCount');
  var _currentPhoto = _photoCount.find('.current');
  var _totalPhoto = _photoCount.find('.total');

  _totalPhoto.text( _asNavFor.find('.slick-slide').length );
  _currentPhoto.text( _asNavFor.find('.slick-current').index()+1 );

  _photoSlide.find('.slick-arrow').click( function(){
    _currentPhoto.text( _asNavFor.find('.slick-current').index()+1);
  })

  _asNav.find('.slick-slide').click( function(){
    _currentPhoto.text( _asNavFor.find('.slick-current').index()+1);
  })
  ////////////////////////////////////////////////////////


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
    let _handle = _this.find('.drawerHandle');
    let _tray = _this.find('.tray');
    let _header = _this.find('.header');
    const speed = 500;
    
    _tray.is(':hidden') ? _handle.text('展開查詢') : _handle.text('收合') ;

    _handle.add(_header).click(function () {
      if (_tray.is(':hidden')) {
        _tray.stop(true, false).slideDown(speed);
        _handle.addClass('closeIt').text('收合');
      } else {
        _tray.stop(true, false).slideUp(speed, function(){
          _handle.removeClass('closeIt').text('展開查詢');
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


  // 分享 ////////////////////////////////////////////////////////
  var _share = $('.share');
  var _shareTo = _share.find('li');
  _share.addClass('reveal');
  setTimeout( function(){	_share.removeClass('reveal')} , 3000);
  _share.hover(
    function(){
      $(this).addClass('reveal');
    },
    function(){
      $(this).removeClass('reveal');
    }
  )
  _shareTo.find('a').focus(function(){
    _share.addClass('reveal');
  })
  _shareTo.last().find('a').blur(function(){
    _share.removeClass('reveal');
  })
  ////////////////////////////////////////////////////////





  //////////////////////////////////////////////
  // 燈箱 //////////////////////////////////////
  var _lightbox = $('.lightbox');
  var _hideLightbox = _lightbox.find('.closeThis');
  const lbxSpeed = 400;
  var _lbxTriger; // 暫存開啟燈箱的元件

  _lightbox.before('<div class="coverAll"></div>'); // 每個燈箱專用遮罩
  _lightbox.append('<button type="button" class="skip">跳到【關閉燈箱】</button>'); // 隱藏的元件，get focus時要回到關燈箱的元件
  var _cover = $('.coverAll');
  var _skipToClose = _lightbox.find('.skip');

  _skipToClose.focus( function () { _hideLightbox.focus(); })

  _hideLightbox.click(function(){
    closeLightbox();
  })
  
  _cover.click(function(){
    closeLightbox();
  })
  
  // 關燈箱
  function closeLightbox() {
    _lightbox.filter(":visible").stop(true, false).fadeOut(lbxSpeed);
    _cover.filter(":visible").stop(true, false).fadeOut(lbxSpeed);
    _body.removeClass('noScroll');
    _lbxTriger.focus();   
  }
  //----------------------//

  // cp 頁相關圖檔以燈箱開啟看大圖 //////////////////////////////////////////////////////////
  // 寬版時正常顯示(flex 排版)；手機螢幕時顯示單張，以左右箭頭控制逐張檢視
  var _slideAreaAtta = $('.attachment').find('.slideArea');
  _slideAreaAtta.each( function () {
    let _this = $(this);
    let _slideList = _this.find('.images');
    let _slideItem = _slideList.children('li');
    let count = _slideItem.length;
    let _slideBtnPrev = _this.find('.slideBtn.prev');
    let _slideBtnNext = _this.find('.slideBtn.next');
    let i = 0;
    _this.append(`<span class="imgCount"><em>` + (i + 1) + `</em> / ` + count + `</span>`);
    let _imgCount = _this.find('.imgCount>em');

    for (let n = 0; n < count; n++) {
      _slideItem.eq(n).attr('data-index', n);
    }
    if (count < 2) { _slideBtnPrev.add(_slideBtnNext).hide() }
    _slideBtnNext.on('click', function () {
      _slideList.animate({ 'left': '-100%' }, 400, function () {
        _slideItem.eq(i).appendTo(_slideList);
        _slideList.css('left', 0);
        i = (i + 1) % count;
        _imgCount.text(i + 1);
      });
    })
    _slideBtnPrev.on('click', function () {
      i = (i - 1 + count) % count;
      _slideItem.eq(i).prependTo(_slideList);
      _slideList.css('left', '-100%');
      _slideList.animate({ 'left': 0 }, 400, function () {
        _imgCount.text(i + 1);
      });
    })

    // 非手機版時，還原縮圖排序
    let wwOrg = _window.width();
    function rerank() {
      for (let i = 0; i < count; i++) {
        _slideItem.eq(i).appendTo(_slideList);
      }
      i = 0;
      _imgCount.text('1');
      _slideItem.removeClass('show');
    }

    // 改變 _window 寬度時，判斷_window 寬度是否大於最小斷點 wwSlim
    let ttt;
    _window.resize ( function () {
      clearTimeout(ttt);
      ttt = setTimeout(function () {
        if (wwOrg < wwSlim && _window.width() >= wwSlim) {
          rerank();
        }
        wwOrg = _window.width();
      }, 200);
    });

  })

  // cp 頁大圖燈箱
  var _bigPhotos = _lightbox.filter('.bigPhotos');
  var _showBigPhotoLbx = $('.attachment').find('.images').find('.showLightbox'); // 開大圖燈箱元件
  var bpIndex;
  var _ItemKeep;

  // 點擊開大圖燈箱元件
  _showBigPhotoLbx.click( function () {
    // _ItemKeep = $(this);
    _lbxTriger = $(this);
    _bigPhotos.add(_cover).stop(true, false).fadeIn(lbxSpeed);
    _bigPhotos.find(_hideLightbox).trigger('focus');
    _body.addClass('noScroll');

    bpIndex = Number($(this).parent('li').attr('data-index'));
    preserveIndex = bpIndex;
    _bigPhotos.find('.imgCount>em').text(bpIndex + 1);
    _bigPhotos.find('.slideArea').find('li').eq(bpIndex).addClass('show');
    
  })

  // 有大圖的燈箱
  _bigPhotos.each(function () {
    let _this = $(this);
    let _slideArea = _this.find('.slideArea');
    let _slideItem = _slideArea.find('li');
    let bpCount = _slideItem.length;
    let _slideBtnPrev = _slideArea.find('.slideBtn.prev');
    let _slideBtnNext = _slideArea.find('.slideBtn.next');
    let _hideLightbox = _this.find('.closeThis');
    // 為大圖燈箱加圖片計數器
    _slideArea.append(`<span class="imgCount"><em></em> / ` + bpCount + `</span>`);
    _imgCount = _slideArea.find('.imgCount>em');
    _slideItem.eq(bpIndex).addClass('show');
    if (bpCount < 2) {
      _slideBtnNext.add(_slideBtnPrev).hide();
    }
    _hideLightbox.add(_cover).on('click', function () {
      _slideItem.removeClass('show');
      // _ItemKeep.focus();
    })

    // 下一張圖
    _slideBtnNext.on('click', function () {
      bpIndex = (bpIndex + 1) % bpCount;
      _slideItem.removeClass('show').eq(bpIndex).addClass('show');
      _imgCount.text(bpIndex + 1);
    })
    // 上一張圖
    _slideBtnPrev.on('click', function () {
      bpIndex = (bpIndex - 1 + bpCount) % bpCount;
      _slideItem.removeClass('show').eq(bpIndex).addClass('show');
      _imgCount.text(bpIndex + 1);
    })
  })



  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // cp_photo 相簿內容頁燈箱：點擊大圖檔以燈箱開啟看更大圖 /////////////////////////////////////////////
  // var _showAlbumPhotoLightbox = _asNavFor.find('.showLightbox');
  var _albumPhotoLbx = _lightbox.filter('.albumPhoto');

  _asNavFor.find('.showLightbox').click( function(){
    _lbxTriger = $(this);
    _albumPhotoLbx.add(_cover).stop(true, false).fadeIn(lbxSpeed);
    _albumPhotoLbx.find(_hideLightbox).trigger('focus');
    _body.addClass('noScroll');
    $("#albumPhotoImg").html($(this).html() + $(this).next().html());
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
  // var _sidebarMenu = _sidebar.find('.menu');
  var _sbmHasChild = _sidebar.find('.menu').find('.hasChild>a');
  var _sidebarMask = $('.sidebarMask');
  _sbmHasChild.click(
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
      _sidebarMask.fadeOut(400, function(){_sidebar.hide()} );
      _body.removeClass('noScroll');
    } else {
      _sidebar.show();
      setTimeout( function(){_sidebar.addClass('reveal')}, 20);
      _sidebarCtrl.addClass('closeIt');
      _sidebarMask.fadeIn(400);
      _body.addClass('noScroll')
    }
  })
  
  _sidebarMask.click(function(){
    _sidebar.removeClass('reveal');
    _sidebarCtrl.removeClass('closeIt');
    _body.removeClass('noScroll');
    $(this).fadeOut(400, function(){_sidebar.hide()});
  })

  _sidebar.find('.topLinks').find('li:last-child>a').blur( function(){
    _sidebarCtrl.focus();
  })




  // 查詢區開合 //////////////////////////////
  var _searchCtrl = $('.searchCtrl');
  var _search = $('.search');
  const srSpeed = 510;
  _searchCtrl.click(function(){
    if( _search.hasClass('reveal')) {
      _search.removeClass('reveal');
      setTimeout(function(){ _search.removeAttr('style'); }, srSpeed);
    } else {
      _search.css('display', 'flex');
      setTimeout (function(){ _search.addClass('reveal')}, 10);
    }
  })
  _search.find('.linkBtn>a').blur( function(){_searchCtrl.focus()})
  // --end of-- 查詢區 //////////////////////////////


  // 按 altKey + s 要 focus 查詢 input 元件 //////////////////////////////
  _window.keydown( function(e){
    if (e.which == 83 && e.altKey ) {
      if (_window.scrollTop() > hh) {
        _html.stop(true,false).animate({scrollTop: 0}, 400, function(){
          _search.find('input[type="text"]').focus();
        });
      } else {
        _search.find('input[type="text"]').focus();
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


  ///////////////////////////////////////////////////////////
  // 舊版內頁移植 ////////////////////////////////////////
  //「福利及照護」、「常用便民系統」分類平滑捲動錨點
  
  // 福利及照護
  var _welfare = $('.welfare');
  var _welAnchor = _welfare.find('.welfCate').find('li>a');
  var _welAnchorTarget = $('.welfContent').find('.welGroup');


  // 常用便民系統 ////////////////////////////////////
  var _eServices = $('.eServices');
  var _esvNav = _eServices.find('.servNav');
  var _esvCate = _esvNav.find('ul');
  var _esvAnchor = _esvCate.find('li>a');
  var _esvAnchorTarget = $('.esvContent').find('.servGroup');
  var _esvCtrl = _esvNav.find('.ctrl');
  
  var welTargetOffsetTop = [];
  var esvTargetOffsetTop = [];

  function getOffsetTop() {
    welTargetOffsetTop = [];
    esvTargetOffsetTop = [];
    let dh;
    ww >= wwNormal ? dh=50 : dh=0 ;
    _welAnchorTarget.each(function () {
      welTargetOffsetTop.push($(this).offset().top - dh);
    });
    _esvAnchorTarget.each(function () {
      esvTargetOffsetTop.push($(this).offset().top - dh);
    });
  }
  getOffsetTop();

  _welAnchorTarget.add(_esvAnchorTarget).find('h3').wrapInner('<a href="javascript:;"></a>');
  _welAnchorTarget.add(_esvAnchorTarget).find('h3>a').attr('aria-label', 'click 或 enter 回分類')
  _welAnchorTarget.add(_esvAnchorTarget).find('h3>a').click(function(e) {
      let i = $(this).parents('.welGroup, .servGroup').index();
      $('html').add(_body).stop(true, false).animate({ scrollTop: 0 }, 800, function() {
          _welAnchor.add(_esvAnchor).parent().eq(i).children('a').focus();
      });
      e.preventDefault();
  });


  _welAnchor.each(function () {
    $(this).click(function (e) {
      let i = $(this).parents('li').index();
      _html.add(_body).stop(true, false).animate({ scrollTop: welTargetOffsetTop[i] }, 800, function () {
        _welAnchorTarget.eq(i).find('h3>a').focus();
      });
      e.preventDefault();
    });
  });
  
  _esvAnchor.each(function () {
    $(this).click(function (e) {
      let i = $(this).parents('li').index();
      _html.add(_body).stop(true, false).animate({ scrollTop: esvTargetOffsetTop[i] }, 600, function () {
        _esvAnchorTarget.eq(i).find('h3>a').focus();
      });
      e.preventDefault();
    });
  });

  
  
  
  // 「常用便民系統」分類選項在行動可收合 ////////////////////////////////////
  var servNavTimeID;
  function servNavShowHide() {
    if (ww < wwMedium) {
      servNavTimeID = setTimeout ( () => { _esvNav.addClass('hide') }, 3000 );
      _esvAnchor.focus( function(){ _esvNav.removeClass('hide'); });
    } else {
      _esvNav.removeClass('hide');
    }
  }
  servNavShowHide();
  
  _esvCtrl.on('focus, click', function() {
    _esvNav.toggleClass('hide');
    clearTimeout(servNavTimeID);
  })
  

  // 行動版資料大類開合 ////////////////////////////////////
	var _category = $('.category');
	_category.each( function(){
		let _this = $(this);
		_this.append('<button type="button" class="cateCtrl">資料大類 展開／收合</button>');
		_this.prepend('<span class="cateNow"></span>');
		let _cateCtrl = _this.find('.cateCtrl');
		let	_cateNow = _this.find('.cateNow');
		_cateNow.text(_this.find('.here a').text());
		let	_cateList = _category.find('ul');
		const speed = 400;
		_cateCtrl.add(_cateNow).click(function(e){
			if (_cateList.is(':hidden')) {
				_cateCtrl.addClass('close');
				_cateList.stop(true, false).slideDown();
				_cateNow.stop(true, false).slideUp();
			} else {
				_cateCtrl.removeClass('close');
				_cateList.stop(true, false).slideUp();
				_cateNow.stop(true, false).slideDown();
			}
		})
		_cateList.find('li>a').click(function(e){
			_cateNow.text($(this).text());
			$(this).parent('li').addClass('here').siblings().removeAttr('class');
			if (ww <= wwMedium) {
				_cateList.stop(true, false).slideUp(speed, function(){
					$(this).removeAttr('style');
				});
				_cateNow.stop(true, false).slideDown();
        _cateCtrl.removeClass('close').focus();
			}
		})
	})



  // 表格條列手機顯示模式 ////////////////////////////////////
  var _listTable = $('.list').find('table');
  function rwdTable(){	
    _listTable.each(function(){
      _this = $(this);
      let _row = $(this).find('tr');
      rowCount = _row.length;
      for ( var n=1; n<=rowCount ; n++ ) {
        _this.find('th').each(function(index) {
          _row.eq(n).find('td').eq(index).attr('data-title',  $(this).text());
        });
      }
    });
  }
  rwdTable();
  

  
  // resize window ////////////////////////////////////
  var winResizeTimer;
  _window.resize(function () {
    clearTimeout(winResizeTimer);
    winResizeTime = setTimeout(function () {
      wwNew = _window.width();
      if (wwNew >= wwMedium) { _category.find('ul').removeAttr('style'); }
      if (wwNew >= wwNormal ) {
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
      getOffsetTop();
      servNavShowHide();
      ww = wwNew;
    }, 200);
  });

})