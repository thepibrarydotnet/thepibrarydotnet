/*jshint jquery:true */

/* ==============================================

    Project |      Coming Soon Page
    @Author        Clasdesign
    @Type          Javascript

=============================================== */

jQuery.noConflict();

(function($){
    "use strict";
    /* global google: false */

    /* ==============================================
     1.Page loader
    =============================================== */
    
    $(document).ready(function(){
        $(".page-loader b").stop(true).delay(600).fadeOut();
        $(".page-loader").stop(true).delay(900).fadeOut("slow");
    });


    /* ==============================================
     2.Home section height 100%
    =============================================== */
    
    $(document).ready(function(){
        $("#home-section").height($(window).height());
    });
    
    $(window).resize(function(){
        $("#home-section").height($(window).height());
    });

    /* ==============================================
     3.Backstrech slider
    =============================================== */

    $(document).ready(function(){
        $("#home-section").backstretch("images/temp/1.jpg");

        });

    /* ==============================================
     4.Textillate title animation
    =============================================== */

    $(document).ready(function() {
        $(".tlt").textillate({
            loop: true,              // Boolean:  (true/false)
            minDisplayTime: 2e3,
            initialDelay: 0,
            autoStart: true,         // Boolean:  (true/false)
                "in": {
                    effect: "flipInY",
                    delayScale: 2.5,
                    delay: 50,
                    sync: false,      // Boolean:  (true/false)
                    shuffle: false,   // Boolean:  (true/false)
                    reverse: false    // Boolean:  (true/false)
                },
                out: {
                    effect: "rotateOut",
                    delayScale: 2.5,
                    delay: 50,
                    sync: false,      // Boolean:  (true/false)
                    shuffle: false,   // Boolean:  (true/false)
                    reverse: false    // Boolean:  (true/false)
                }
        });
    });

    /* ==============================================
     5.Countdown
    =============================================== */

    /*To change date, simply edit: day, month, year, hour, min, sec*/
    $('#countdown_dashboard').countDown({
        targetDate: {
            'day':      1,
            'month':    4,
            'year':     2015,
            'hour':     9,
            'min':      0,
            'sec':      0
        },
        omitWeeks: true         // Boolean:  (true/false)
    });


    /* ==============================================
     6.Parallax
    =============================================== */
    
    $(document).ready(function(){
        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 0
        });
    });


    /* ==============================================
     CounterTo
    =============================================== */

    $(document).ready(function(){
        function countUp() {   
            var dataperc;   
            $('.skill-percent').each(function(){
                dataperc = $(this).attr('data-perc'),
                $(this).find('.percentfactor').delay(6000).countTo({
                    from: 0,
                    to: dataperc,
                    speed: 1000,             // ms
                    refreshInterval: 10,
                });  
            });
        }
        
        $('.skill-percent').waypoint(function() {
            countUp();
        },
        {
            offset: '95%',                 
            triggerOnce: true
        });

    });

    /* ==============================================
     7.Animated Elements
    =============================================== */

    $(document).ready(function(){
        $('.animated').appear(function(){
        var el = $(this);
        var anim = el.data('animation');
        var animDelay = el.data('delay');
        if (animDelay) {

            setTimeout(function(){
                el.addClass( anim + " in" );
                el.removeClass('out');
            }, animDelay);

        }

        else {
            el.addClass( anim + " in" );
            el.removeClass('out');
        }    
        },{accY: -150});  
    });


    /* ==============================================
     8.Fade In .back-to-top
    =============================================== */

    $(document).ready(function() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        $('.back-to-top').click(function () {
            $('html, body').animate({
                scrollTop: 0,
                easing: 'swing'
            }, 750);
            return false;
        });

    });


    /* ==============================================
     10.Fix IE Placeholder
    =============================================== */

    $(document).ready(function() { 
        $('input').placeholder();
    });


    /* ==============================================
    /*  Contact Map
    =============================================== */

    $(document).ready(function() {

    var contact = {"lat":"51.51152", "lon":"-0.125198"}; //Change a map coordinate here!

        var mapContainer = $('.map');
        mapContainer.gmap3({
            action: 'addMarker',
            marker:{
                options:{
                    icon : new google.maps.MarkerImage('images/marker.png')
                }
            },
            latLng: [contact.lat, contact.lon],
            map:{
                center: [contact.lat, contact.lon],
                zoom: 17
                },
            },
            {action: 'setOptions', args:[{scrollwheel:false}]}
        );
    });

    /* ==============================================
    11.BOOTSTRAP FIX FOR WINPHONE 8 AND IE10
    =============================================== */

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(
            document.createTextNode(
                '@-ms-viewport{width:auto!important}'
            )
        );
        document.querySelector('head').appendChild(msViewportStyle);
    }

})(jQuery);


function initializeForm() {
    "use strict";

    /* ==============================================
     12.Subscribe Form
    =============================================== */

    jQuery(function(jQuery) {
        jQuery('body').on('click','#subscribe',function(){jQuery.ajax({'type':'POST','success':function(data) {
                                    
        var error = jQuery('.notification.error');
        var success = jQuery('.notification.success');
        if(data == 1) {
            success.css('opacity', 0);
            success.slideDown(300);
            success.animate({
                opacity : 1
            }, 300);
            error.hide();
        } else {
            error.css('opacity', 0);
            error.slideDown(300);
            error.animate({
                opacity : 1
            }, 300);
            success.hide();
        } 
        },
        'url':'php/form.php',         
        'cache':false,
        'data':jQuery(this).parents("form").serialize()});return false;});
    });

    /* ==============================================
     13.Contact Form
    =============================================== */

    jQuery('#contactform').submit(function(){

        var action = jQuery(this).attr('action');

        jQuery("#alert").slideUp(750,function() {
            jQuery('#alert').hide();

        jQuery('#submit')
            .after('<img src="images/ajax-loader.gif" class="contactloader" />')
            .attr('disabled','disabled');

        jQuery.post(action, {
            name: jQuery('#name').val(),
            email: jQuery('#email').val(),
            message: jQuery('#message').val()
        },
            function(data){
                document.getElementById('alert').innerHTML = data;
                jQuery('#alert').slideDown('slow');
                jQuery('#contactform img.contactloader').fadeOut('slow',function(){jQuery(this).remove();});
                jQuery('#submit').removeAttr('disabled');
                if(data.match('success') !== null) {
                    jQuery('#name').val('');
                    jQuery('#email').val('');
                    jQuery('#message').val('');
                }
            }
        );

        });

        return false;

    });

}


jQuery(document).ready(function(){

    initializeForm();

});











