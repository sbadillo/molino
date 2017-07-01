(function($) {
    $(function() {
        $('.jcarousel-1')
            .jcarousel()
            .jcarouselSwipe()
            .jcarouselLazyLoading({
                waitFunction: waitFunction
            });

        $('.jcarousel-2')
            .jcarousel()
            .jcarouselSwipe()
            .jcarouselLazyLoading({
                preventScroll: false,
                waitFunction: waitFunction
            });

        function waitFunction($slides, callback, isScrollPrevented) {
            $slides.imagesLoaded(function() {
                // all images loaded
                callback();
            }).progress(function( instance, loadingImage ) {
                // one image loaded
                $(loadingImage.img).removeClass('loading');
            });

            // load images
            $slides.find('img[data-src]').each(function() {
                var $img = $(this);
                var src = $img.attr('data-src');

                $img
                    .attr('src', src)
                    .removeAttr('data-src')
                    .addClass('loading');

                if (isScrollPrevented) {
                    // if scroll was prevented then show animation not need
                    $img.addClass('non-transition');
                }
            });
        }

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=3'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=3'
            });
    });
})(jQuery);
