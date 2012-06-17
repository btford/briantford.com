/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, browser: true, devel: true */


/*
Structure of prototype

var proto = {
    construct: function () { return an array of nodes}
};
*/

// Menu is a state.
var Menu = function (proto) {

    // Private
    var menu = {},
        elts = [],
        construct = proto || function () { console.log("This menu has no constructor."); return []; };
    
    // Public member functions
    menu.start = function () {
        elts = construct();
    };
    
    menu.end = function () {
        game.canvas.clear();
    };
    
    return menu;
};
