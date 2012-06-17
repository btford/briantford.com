
// Constructor of an object representing a group of entities
// Provides enumeration over contained Entities
var Group = function (proto) {
    
    // Private
    var group = {},
        drawFn = proto.draw || null,
        updateFn = proto.update || null,
        initFn = proto.init || null,
        remFn = proto.remove;
        
        
    group.x_offset = (proto.x_offset || 0),
    group.y_offset = (proto.y_offset || 0);

    
    // Provide public access to elts
    group.elts = [];
    
    // public methods
    group.add = function (proto) {
        proto.id = group.elts.length;
        proto.parent = group;
        group.elts.push(new Entity(proto));
    };
    
    if (proto.elts) {
        (function () {
            var i;
            for (i = 0; i < proto.elts.length; i += 1) {
                group.add(proto.elts[i]);
            }
        }());
    }
    
    /*
    group.setUpdate = function (fn) {
        updateFn = fn;
    };
    */
    
    //TODO: better generalize this feature
    group.update = function () {
        var i;
        for (i = 0; i < group.elts.length; i += 1) {
            updateFn.apply(group.elts[i]);
        }
    };
    
    group.draw = function () {
        var i;
        for (i = 0; i < group.elts.length; i += 1) {
            drawFn.apply(group.elts[i]);
        }
    };
    
    group.init = function () {
        var i;
        for (i = 0; i < group.elts.length; i += 1) {
            initFn.apply(group.elts[i]);
        }
    };
    
    group.remove = function () {
        var i;
        for (i = 0; i < group.elts.length; i += 1) {
            remFn.apply(group.elts[i]);
        }
        delete elts[i];
    };
    
    group.removeOne = function (id) {
        var j;
        //TODO: stop being lazy, use an object instead.
        for (j = 0; j < group.elts.length; j += 1) {
            if(group.elts[j].id === id) {
                remFn.apply(group.elts[j]);
                group.elts.splice(j, 1);
                return true;
            }
        }
        
        return false;
    };
    
    return group;
};