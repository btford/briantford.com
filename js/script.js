/* Author: Brian Ford
*
*/

/*jslint browser: true, maxerr: 50, indent: 4 */
/*global */
/*global $, console, Raphael, requestAnimationFrame, Modernizr*/

// Closure
(function () {
    
    "use strict";
    
    var $me = {
        animation: {},
        history: {},
        util: {}
    };
    
    $me.util.rand = function (num) {
        return Math.floor(Math.random() * num);
    };
    
    $me.util.sign = function (num) {
        if (num === 0) {
            return 0;
        } else {
            return Math.round(Math.abs(num) / num);
        }
    };
    
    $me.util.dist = function (ob1, ob2) {
        return Math.sqrt(
            Math.pow(ob1.x - ob2.x, 2)
                + Math.pow(ob1.y - ob2.y, 2)
        );
    };
    
    $me.history = (function () {
        var cache = {},
        
            asyncLoad,
            repurposeLinks,
            title,
            initialize;

        asyncLoad = function (page) {

            if (cache[page]) {
                $("#main").html(
                    cache[page]
                );
                repurposeLinks("#main");
            } else {
                $.get('/async.php?p=' + page,
                    function (html) {
                        cache[page] = html;
                        $("#main").html(html);
                        repurposeLinks("#main");
                    });
            }
        };

        repurposeLinks = function (elt) {
            $(elt).find('a[href^="/"]').each(function (num, e) {
                var elt = $(e),
                    href;

                href = elt.attr("href");

                if (href.substr(1, 5) !== "files") {
                    elt.click(function (event) {
                        event.preventDefault();

                        asyncLoad(href);
                        title(href);
                        history.pushState(null, null, href);
                    });
                }
            });
        };

        title = function (href) {
            var split = href.split("/"),
                newTitle = "Brian Ford",
                i;

            for (i = 0; i < split.length; i += 1) {
                if (split[i].length > 0) {
                    newTitle += ' » ' + split[i].charAt(0).toUpperCase() + split[i].slice(1);
                }
            }

            window.document.title = newTitle;
        };
        
        initialize = function () {
            repurposeLinks(document);
            window.addEventListener("popstate", function (ev) {
                asyncLoad(location.pathname);
                title(location.pathname);
            });
        };
        
        return initialize;
    }());
    
    
    // Start
    $(document).ready(function () {
        //$me.animation();
        if (Modernizr.history) {
            $me.history();
        }
    });
}());