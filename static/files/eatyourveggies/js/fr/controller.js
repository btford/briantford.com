 // Keycode constants
var KEY = {
    UP: 87,
    DOWN: 83,
    LEFT: 65,
    RIGHT: 68,
    PAUSE: 32,
    QUIT: 113
};

// This object contains the bindings for keypress events.
var controller = (function () {

    // Private members
    var codes = {}, states = {}, cont = {};

    document.onkeypress = function (e) {
        var c = e.keyCode || e.charCode;
        if (codes[c]) {
            codes[c]();
        }
        //Debug:
        //console.log("Keypress: " + c);
    };
    
    document.onkeydown = function (e) {
        states[e.keyCode] = true;
        //console.log(e.keyCode);
    };
    
    document.onkeyup = function (e) {
        states[e.keyCode] = false;
        
    };
    
    // Public member functions
    cont.setMap = function (key, fn) {
        codes[key] = fn;
    };
    
    cont.removeMap = function (key) {
        if (codes[key]) {
            delete codes[key];
            //console.log("Removed map to " + key);
            return true;
        } else {
            //console.log("Attempted to remove nonexistent map to " + key);
            return false;
        }
    };
    
    cont.resetMap = function () {
        var map;
        for (map in codes) {
            //TODO: filter these better, maybe wrap functions in an object
            if (map !== "superior") {
                cont.removeMap(map);
            }
        }
    };
    
    cont.getState = function (key) {
        return states[key] || false;
    };
    
    return cont;
}());