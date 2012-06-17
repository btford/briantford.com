/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, browser: true, devel: true */

/*global Level: false, game: false, Interaction: false, controller: false, KEY: false */

// This object represents the gameloop for realtime games
var Gameloop = function (proto) {

    // Private
    var gl = {level: {dyn: {}, sta: {}}}, // gameloop; returned object
        cont = true, // Continue: whether or not to continue to the next frame in the gameloop
        // Private member functions
        init,
        inter = proto.inter || null,
        update,
        draw,
        loop,
        loopTimeout,
        pause,
        levels = proto.levels || null,
        levelConstruct = proto.levelConstruct || null,
        rules = proto.rules || null,
        icecreamMeltConfig = proto.icecreamMeltConfig || [],
        foodMeltConfig = proto.foodMeltConfig || [],
        objectConfig = proto.objectConfig || [];
        
    gl.init = proto.init || null;
    gl.inter = [];
    gl.levels = proto.levels.length || null;
    
    // Private member functions
    ///////////////////////////////////////////////////////////////////////////
    init = function () {
        var i, obj;
        
        game.bgm = new Audio("res/aud/chase.mp3");
    
        // Define static groups here
        gl.level = new Level(levels[game.level], levelConstruct, rules); // tiles on the level
    
        if (gl.init) {
            gl.init();
        }
        
        for (i = 0; i < inter.length; i += 1) {
            gl.inter.push(
                new Interaction(
                    gl.level[inter[i].g1.type][inter[i].g1.name],
                    gl.level[inter[i].g2.type][inter[i].g2.name],
                    inter[i].fn
                )
            );
        }

        // Draw initial state
        for (i in gl.level.dyn) {
            if (typeof gl.level.dyn[i] !== 'function') {
                gl.level.dyn[i].init();
            }
        }
        for (i in gl.level.sta) {
            if (typeof gl.level.sta[i] !== 'function') {
                gl.level.sta[i].init();
            }
        }
        if(icecreamMeltConfig[game.level]) {
            for(i = 0; i<icecreamMeltConfig[game.level].length; i += 1) {
                gl.level.dyn.icecream.elts[i].melt = icecreamMeltConfig[game.level][i];
                gl.level.dyn.icecream.elts[i].solid = icecreamMeltConfig[game.level][i];
            }
        }
        
        if(foodMeltConfig[game.level]) {
            for(i = 0; i<foodMeltConfig[game.level].length; i += 1) {
                gl.level.dyn.food.elts[i].melt = foodMeltConfig[game.level][i];
                gl.level.dyn.food.elts[i].solid = 50;
            }
        }
        
        if(objectConfig[game.level]) {
            for(i = 0; i<objectConfig[game.level].length; i += 1) {
                obj = objectConfig[game.level][i];
                game.canvas.image(obj.img, obj.x, obj.y, obj.width, obj.height);
            }
        }
    };
    
    update = function () {
        var i, j;
        
        // update dynamic entity groups
        for (j in gl.level.dyn) {
            if (typeof gl.level.dyn[j] === 'object') {
                gl.level.dyn[j].update();
            }
        }
        
        // update interactions between classes of objects
        for (i = 0; i < gl.inter.length; i += 1) {
            gl.inter[i].update();
        }
    };
    
    draw = function () {
        var i;
    
        // update dynamic entities
        for (i in gl.level.dyn) {
            if (typeof gl.level.dyn[i] === 'object') {
                gl.level.dyn[i].draw();
            }
        }
        
        // GUI here
    };
    
    loop = function () {
    
        // call each dynamic object's update function
        // perform interaction functions on each object pair
        update();
        
        // re-draw each object (update the Raphael nodes)
        draw();
        
    };
    
    pause = function () {
        //TODO:
        // Show pause screen. A sub-state within gameloop
    };
    
    
    // Public member functions
    gl.start = function () {
        init();
        game.gfx = game.canvas.image("res/img/menu/spacebar.png", 650, 415 , 500, 250);
        
        controller.setMap(KEY.PAUSE, function () {
            
            controller.setMap(KEY.PAUSE, function () {
                if (gl.isPaused()) {
                     gl.unpause();
                } else {
                    gl.pause();
                }
            });
            
            gl.unpause();
        });
        
        controller.setMap(KEY.PAUSE, function () {
            
            controller.setMap(KEY.PAUSE, function () {
                if (gl.isPaused()) {
                     gl.unpause();
                } else {
                    gl.pause();
                }
            });
            
            gl.unpause();
        });
    };
    
    gl.end = function () {
        
        // clear the timeout function
        clearInterval(loopTimeout);
        cont = false;
        
        game.canvas.clear();
        
        controller.resetMap();
    };
    
    gl.pause = function () {
        if (gl.pauseHandle) {
            gl.pauseHandle();
        }
        game.gfx = game.canvas.image("res/img/menu/pause.png", 745, 475 , 311, 131);
        cont = false;
        clearInterval(loopTimeout);
        game.bgm.pause();
        pause();
    };
    
    gl.unpause = function () {
        if (gl.unpauseHandle) {
            gl.unpauseHandle();
        }
        cont = true;
        
        //game.bgm.start();
        
        if(game.gfx) {
            game.gfx.remove();
        }
        
        //TODO: find a good value for this.
        loopTimeout = setInterval(loop, 15);
    };
    
    gl.isPaused = function () {
        return !cont;
    };
    
    return gl;
};