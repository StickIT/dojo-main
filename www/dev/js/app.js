jQuery(document).ready(function(){
    jQuery('#my-video').seeThru();
    // Add scrollspy to <body>
    jQuery('body').scrollspy({target: ".navbar", offset: 0});   

    // Add smooth scrolling on all links inside the navbar
    jQuery(".navbar-nav a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            jQuery('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }  // End if
    });

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = jQuery('#navbarMain').outerHeight() + 150;

    jQuery(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down            
            jQuery('#navbarTop').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st < 800) {
                jQuery('#navbarTop').removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }
});

var lang = jQuery('html').attr('lang');

jQuery(document).on('submit', 'form.newsletter', function (e) {
    e.preventDefault();
    var form = jQuery(this);
    var url = form.attr('action');
    jQuery.post(url, form.serialize())
        .done(function (data) {
            var response = data;
            swal(
                response.title,
                response.message,
                'success'
            )
        })
        .fail(function (data) {
            var response = data.responseJSON;
            swal(
                response.title,
                response.message,
                'error'
            )
    });
});
