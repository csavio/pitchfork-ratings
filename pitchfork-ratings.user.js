// ==UserScript==
// @name              Show Pitchfork Ratings for Albums
// @version           1.10.3
// @namespace         http://pitchfork.com/
// @include           http://www.pitchforkmedia.com/*
// @include           http://pitchforkmedia.com/*
// @include           http://www.pitchfork.com/*
// @include           http://pitchfork.com/*
// @require           http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @description       This is now a fairly heavily modified version of http://userscripts.org/scripts/show/49052 updated so it gets albums and retries when an album rating is not available
// ==/UserScript==

var debugmode = true;
var styles = '<style>span.rating {font-size: 12pt; background:white; position:absolute; display:block;width:30px; height:25px; padding:5px 27px 20px 5px; top:5px; left:25px; z-index:2; font-weight:bold; border-radius: 5px;}.orange{color:orange} .green{color:green}.red{color:red}</style>',
    initloc = window.location.href,
    firstrun = true;
var loccheck = setInterval(checkLoc, 300);

if (debugmode === true) {
    debugger;
}

function getLinks(mylinks, counter) {
    mylinks = mylinks || '';
    counter = counter || 0;
    if ( $('a[href="' + mylinks + '"] span.rating').length === 0 ) {
        $.ajax({
            url: location.protocol + '//' + location.host + mylinks,
            cache: true,
            success: function (data) {
                try {
                    var rating = $(data).find("span.score").html();
                    rating = (rating.indexOf(".") > -1 ) ? rating : (rating + ".0");
                    if (isNaN(rating)) {
                        if (counter < 5) {
                            setTimeout(getLinks(mylinks, counter++), 2000);
                            return;
                        }
                        else {
                            rating = '?';
                        }
                    }
                    if (rating > 5.0 && rating <= 6.9) {
                        spanclass = "orange";
                    }
                    else if (rating > 6.9) {
                        spanclass = "green";
                    }
                    else {
                        spanclass = "red";
                    }

                    $('a[href="' + mylinks + '"]').append('<span class="rating ' + spanclass + '">' + rating + '</span>');

                }
                catch (e) {
                }
            }
        });
    }

}

function checkLoc() {
    var loc = window.location.href;

    // Only do something if the location has changed and it is an album review listing
    if ((firstrun || loc != initloc) && window.location.href.match(/(\/reviews\/)|(\/best\/)/)) {
        $('head').append(styles);
        firstrun = false;
        setTimeout(function () {
            $(".review a[href*='reviews/albums']").each(function () {
                myhref = $(this).attr('href');
                if (myhref.search(/reviews\/albums\/.*/) === 1) {
                    getLinks(myhref);
                }
            });
        }, 1000);
    }

    initloc = window.location.href;
}
