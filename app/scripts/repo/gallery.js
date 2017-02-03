/* eslint no-console: 0 */
/* eslint eqeqeq: 0 */



(function($){

    $.fn.vitGallery = function( options) {

        var settings = $.extend({
            debag: false,
            buttons: true,
            imgBlockClass: 'gallery__img-block',
            controls: true,
            controlsClass: 'gallery__controls',
            animateSpeed: 1000,
            imgPadding: 15,
            autoplay: false,
            autoplayDelay: 500,

        }, options);

        var $this = $(this)
          , $imgBlock = $this.find('.'+ settings.imgBlockClass)
          , $controlsBlock
          , $prevButton
          , $nextButton
          , $controlsItem
          , $galleryInner
          , $currentBlock
          ;

        var _galleryInnerClass = 'gallery__inner';

        function updatevariables() {
            $controlsBlock = $this.find('.' + settings.controlsClass);
            $prevButton = $('.prev');
            $nextButton = $('.next');
            $controlsItem = $('.gallery__controls__item');
            $galleryInner = $('.gallery__inner');
            $currentBlock = $galleryInner.find('.gallery__img-block.current');
        }

        function addClasses () {

            $imgBlock.each(function(){
                $(this).find('span').addClass('gallery__img-block__description');
                $(this).find('img').addClass('gallery__img-block__img')
            })
        }

        function addWrapper() {
            $imgBlock.wrapAll('<div class="' + _galleryInnerClass + '"></div>');
        }

        function getFullWidth() {
            var imgBlockWidth = 0;

            if (settings.imgPadding && settings.imgPadding != 0) {
                imgBlockWidth = ($imgBlock.length - 1) * settings.imgPadding;
            }

            $imgBlock.each(function(){
                imgBlockWidth = imgBlockWidth + $(this).outerWidth();
            })

            return imgBlockWidth;
        }

        function setInnerWidth() {
            var inner = $('.' + _galleryInnerClass);

            inner.css('width', getFullWidth());
        }

        function setImgBlockWidth() {
            $imgBlock.css('width', $this.width());
        }

        function setGalleryHeight() {
            var heightArr = [];
            $imgBlock.each(function(){
                var imhHeight = $(this).find('.gallery__img-block__img').height();
                heightArr.push(imhHeight);
            })

            $this.css('height', Math.max.apply(null, heightArr));
        }

        function createControls() {
            if (settings.controls) {
                $controlsBlock = $this.find('.' + settings.controlsClass);

                var prev = '<span class="prev"></span>'
                  , next = '<span class="next"></span>'
                  , item = '<li class="gallery__controls__item"></li>'
                  ;


                for (var i=0; $imgBlock.length > i; i++) {
                    var newItem = $controlsBlock.append(item);

                }

                $('.gallery__controls__item').each(function(index){
                    $(this).addClass('item_' + index)
                })

                $controlsBlock.append(newItem);
                var galleryUl = $(newItem).find('li').wrapAll('<ul class="gallery__controls__ul"></ul>');

                $(galleryUl).parent().before(prev).after(next);

            }


        }

        function showImg() {
            $imgBlock.each(function(index){
                if (index != 0) {
                    $(this).css('display', 'inline-block');
                }
            })
        }

        function nextSlide() {
            if (!$currentBlock.is(':first-child')) {

                $galleryInner.animate({
                    left: galleryInnerPosition + $imgBlock.width()
                }, settings.animateSpeed);

                galleryInnerPosition = galleryInnerPosition + $imgBlock.width();

                $currentBlock.removeClass('current');
                $currentBlock.prev().addClass('current');

                $('.gallery__controls__item:eq('+  currentBlockIndex +')').removeClass('current');

                currentBlockIndex--;

                $('.gallery__controls__item:eq('+  currentBlockIndex +')').addClass('current');

            }
        }

        function prevSlide() {
            if (!$currentBlock.is(':last-child')) {

                $galleryInner.animate({
                    left: galleryInnerPosition - $imgBlock.width()
                }, settings.animateSpeed);

                galleryInnerPosition = galleryInnerPosition - $imgBlock.width();

                currentBlock.removeClass('current');
                currentBlock.next().addClass('current');

                $('.gallery__controls__item:eq('+  currentBlockIndex +')').removeClass('current');
                currentBlockIndex++;

                $('.gallery__controls__item:eq('+  currentBlockIndex +')').addClass('current');
            }
        }

        function bindEvents() {
            //var $prevButton = $('.prev')
              //, $nextButton = $('.next')
              //, $controlsItem = $('.gallery__controls__item')
              //, $galleryInner = $('.gallery__inner')
            var galleryInnerPosition = parseInt($galleryInner.css('left'))
              //, currentBlock = $galleryInner.find('.gallery__img-block.current')
              , currentBlockIndex = $currentBlock.index()
              ;

            $prevButton.on('click', function(){

                $currentBlock = $galleryInner.find('.gallery__img-block.current');

                nextSlide();
            })

            $nextButton.on('click', function(){

                $currentBlock = $galleryInner.find('.gallery__img-block.current');

                prevSlide();
            })

            /*$controlsItem.on('click', function() {
                var itemIndex = $(this).index() + 1;

                $galleryInner.animate({
                    left: galleryInnerPosition $imgBlock.width()
                },300);
            })*/
        }

        function init() {
            addClasses();
            addWrapper();
            setGalleryHeight();
            setImgBlockWidth();
            setInnerWidth();
            showImg();
            createControls();

            updatevariables();

            $imgBlock.first().addClass('current');
            $('.gallery__controls__item').first().addClass('current');

            bindEvents();
        }

        init();

    }
})(jQuery)
