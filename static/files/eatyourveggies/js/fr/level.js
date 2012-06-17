/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, browser: true, devel: true */

/*global Group: false */

var Level = function (proto, ent, rules) {
    var i, j,
        group_elts = {},
        current_group = null,
        level = {
            sta: {},
            dyn: {}
        },
        size = game.tileSize,
        bgsize = 4;
    
    // initialize each possible group.
    /*
    if (!group_elts[current_group.name]) {
        group_elts[current_group.name] = [];
    }
    */
    
    for (i = 0; i < proto.length; i += 1) {
        for (j = 0; j < proto[i].length; j += 1) {
        
            if(i % bgsize === 0 && j % bgsize === 0) {
                game.canvas.image("res/img/tiles/wood_floor.png", (size * j), (size * i), bgsize*size, bgsize*size);
            }
        
            if (ent[proto[i].charAt(j)]) {
            
                current_group = ent[proto[i].charAt(j)].name;
                if (!group_elts[current_group]) {
                    group_elts[current_group] = [];
                }
            
                group_elts[current_group].push({
                    x: ((size * j) + size*(rules[current_group].x_offset || 0)),
                    y: ((size * i) + size*(rules[current_group].y_offset || 0)),
                    width: rules[current_group].width,
                    height: rules[current_group].height,
                    //DEBUG:
                    //src: (((proto[i].charAt(j)==='X')?{def:["res/img/tile.png"]}:rules[current_group].src) || {def: ["res/img/tile.png"]}),
                    src: (((proto[i].charAt(j)==='X')?{def:["res/img/blank.png"]}:rules[current_group].src) || {def: ["res/img/tile.png"]}),
                });
            }
        }
    }


    for (i in group_elts) {
        if (typeof group_elts[i] === 'object') {
        
            //DEBUG:
            //console.log(group_elts[i]);
        
            level[rules[i].type][i] = new Group({
                update: rules[i].update, // update
                draw: rules[i].draw, // draw
                init: rules[i].init,
                remove: rules[i].remove,
                elts: group_elts[i]
            });
        }
    }

    return level;
};
