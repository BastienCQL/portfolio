function runScroll(){
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
