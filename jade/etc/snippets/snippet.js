var sync = function (fns, callback) {
    var called = 0,
        hiddenCallback,
        i;
        
    hiddenCallback = function () {
        called += 1;
        if (called === fns.length) {
            callback();
        }
    };
    
    for (i = 0; i < fns.length; i += 1) {
        fns[i](hiddenCallback);
    }
};