// Representing visible game item
var Entity = function (proto) {
    if (typeof proto === "undefined") {
        proto = {parent: null};
    }
    
    // inherit properties from prototype, then parent, or default.
    var entity,
        parent = proto.parent;

    entity = {
        x: (proto.x || 0),
        y: (proto.y || 0),
        width: (proto.width || game.tileSize),
        height: (proto.height || game.tileSize),
        v: 0,
        id: proto.id || 0,
        src: (proto.src || {def: ["res/img/ruby.png"]}),
        frame: (proto.frame || 0),
        animate: (proto.animate || false)
    };
    
    entity.remove = function () {
        parent.removeOne(entity.id);
    };
    
    return entity;
};