$( document ).ready(function() {

    $('body').scrollspy({target: ".navbar", offset: $("#scrollspy").height()});
    $("#scrollspy ul li a").on('click', function(e) {

        e.preventDefault();

        var hash = this.hash;
        
        $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function(){

                window.location.hash = hash;
            });

    });



    var items = $('#carousel .carousel-item'), //grab all slides
        heights = [], //create empty array to store height values
        tallest; //create variable to make note of the tallest slide
    
    if (items.length) {
        function normalizeHeights() {
            items.each(function() { //add heights to array
                heights.push($(this).height()); 
            });
            tallest = Math.max.apply(null, heights); //cache largest value
            items.each(function() {
                $(this).css('min-height',tallest + 'px');
            });
        };
        normalizeHeights();
    
        $(window).on('resize orientationchange', function () {
            tallest = 0, heights.length = 0; //reset vars
            items.each(function() {
                $(this).css('min-height','0'); //reset min-height
            }); 
            normalizeHeights(); //run it again 
        });
    }
    
    
});

(function($) {
    $.fn.bcSwipe = function(settings) {
      var config = { threshold: 50 };
      if (settings) {
        $.extend(config, settings);
      }
  
      this.each(function() {
        var stillMoving = false;
        var start;

        console.log(0)
  
        if ('ontouchstart' in document.documentElement) {
          this.addEventListener('touchstart', onTouchStart, false);
        }
  
        function onTouchStart(e) {
            console.log(1)
          if (e.touches.length == 1) {
            start = e.touches[0].pageX;
            stillMoving = true;
            this.addEventListener('touchmove', onTouchMove, false);
          }
        }
  
        function onTouchMove(e) {
            console.log(2)
          if (stillMoving) {
            var x = e.touches[0].pageX;
            var difference = start - x;
            if (Math.abs(difference) >= config.threshold) {
              cancelTouch();
              if (difference > 0) {
                console.log(3)
                $(this).carousel('next');
              }
              else {
                console.log(4)
                $(this).carousel('prev');
              }
            }
          }
        }
  
        function cancelTouch() {
          this.removeEventListener('touchmove', onTouchMove);
          start = null;
          stillMoving = false;
        }
      });
  
      return this;
    };
  })(jQuery);