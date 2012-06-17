/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, browser: true, devel: true */

// Interface for various states within a game.
// I don't think this is ever actually called.
var State = function () {
    // Private
    var state = {};
    
    // Public member functions
    state.start = function () {};
    state.end = function () {};
    
    return state;
};
