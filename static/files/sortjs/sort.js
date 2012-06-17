/*jslint devel: true, browser: true, maxerr: 50, indent: 4 */
/*global $*/

(function () {
    
    "use strict";
    
    var list = [1, 9, 3, 7, 5],
        randomize,
        mergesort;
    
    (function () {
        var merge = function (left, right) {
            var result = [];
            
            while (left.length > 0 || right.length > 0) {
                if (left.length === 0) {
                    result.push(right.shift());
                } else if (left.length === 0) {
                    result.push(right.shift());
                } else {
                    if (left[0] > right[0]) {
                        result.push(right.shift());
                    } else {
                        result.push(left.shift());
                    }
                }
            }
            
            return result;
        };
        
        mergesort = function (list, parent, callback) {
            var child = $('<div style="float: left;"><div style="float: none;">[' + list.toString() + ']</div></div>'),
                left,
                right,
                center;

            $(child)
                .appendTo(parent)
                .hide()
                .slideDown('slow', function () {
                    
                    if (list.length > 1) {

                        center = Math.floor(list.length / 2);

                        right = list.splice(center);
                        left = list.splice(0, center);

                        mergesort(left, child, function (left) {
                            mergesort(right, child, function (right) {
                                var merged = merge(left, right);

                                $("<div>[" + merged.toString() + "]</div>")
                                    .appendTo(parent)
                                    .hide()
                                    .slideDown('slow', function () {
                                        callback(merged);
                                    });
                            });
                        });
                    } else {
                        callback(list);
                    }
                });
        };

        $("#go").click(function () {
            mergesort(list, "#animate", function () {});
        });
    }());
}());