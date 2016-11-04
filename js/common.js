$(document).ready(function(){
    runScroll();
    clickScroll();
    fixIe();
});
;function runScroll(){
    var $el = $('.fade'); // Declare the element //

    if($el.length){ // Check if element exists //
        // Declare our variables //
        var $header   = $('.header-span'),
            offsetTop = $header.offset().top, // Get offset from top of page //
            offsetTop = offsetTop + $header.height(); // Add height of element //

        // Run stuff //
        $(window).scroll(function() {
            var $this = $(this);

            // Testing where we are with offsetTop //
            if ($this.scrollTop() > offsetTop){
                $el.addClass("hide");
            } else {
                $el.removeClass("hide");
            }
        });
    }
}

function clickScroll(){
    var $el = $('.js-scroll');

    if($el.length){
        var speed = 500;

        $el.on('click', function(e) {
            var page = $(this).attr('href'),
                offsetHeight = $(page).offset().top;

            $('html, body').animate({
                scrollTop: offsetHeight
            }, speed );

            e.preventDefault();
        });
    }
}

//This function is a bug fix, the buf encountered was shaky background at scroll on IE
//Solution found here : http://stackoverflow.com/questions/27966735/why-background-image-is-moving-when-scroll-at-ie
function fixIe() {
  if(navigator.userAgent.match(/Trident\/7\./)) {
     $('body').on("mousewheel", function () {
         event.preventDefault();

         var wheelDelta = event.wheelDelta;

         var currentScrollPosition = window.pageYOffset;
         window.scrollTo(0, currentScrollPosition - wheelDelta);
     });

     $('body').keydown(function (e) {
         e.preventDefault(); // prevent the default action (scroll / move caret)
         var currentScrollPosition = window.pageYOffset;

         switch (e.which) {

             case 38: // up
                 window.scrollTo(0, currentScrollPosition - 120);
                 break;

             case 40: // down
                 window.scrollTo(0, currentScrollPosition + 120);
                 break;

             default: return; // exit this handler for other keys
         }
     });
  }
}
