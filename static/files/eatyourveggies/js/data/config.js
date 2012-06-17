
//TODO: move this to its own file
var gameloopConfig = (function () {

    var interactions,
        levels,
        rules,
        levelConstructorConfig,
        gameloopConfig,
        icecreamMeltConfig,
        foodMeltConfig,
        objectConfig;

    interactions = [
        // Hacked player/wall collision into player.update()
        // Mom doesn't need collision detection since she follows player's path
        {
            g1: {type: "dyn", name: "player"}, // targets
            g2: {type: "dyn", name: "icecream"},
            fn: function (player, ice) {
                if (collision(player, ice)) {
                    game.score += 1000;
                    player.speed = 4;
                    player.spdchng = 75; // fast for 2 seconds
                    ice.remove();
                    (new Audio("res/aud/chomp.wav")).play();
                }
            }
        },
        {
            g1: {type: "dyn", name: "player"}, // targets
            g2: {type: "dyn", name: "food"},
            fn: function (player, food) {
                if (collision(player, food)) {
                    game.score -= 200;
                    food.remove();
                    player.speed = 1;
                    player.spdchng = 50; // fast for 5 seconds
                    //DEBUG:
                    //console.log("ate food");
                    (new Audio("res/aud/chomp.wav")).play();
                    //TODO: lose a "life?"
                }
            }
        },
        {
            g1: {type: "dyn", name: "player"}, // targets
            g2: {type: "sta", name: "door"},
            fn: function (player, door) {
                if (collision(player, door)) {
                    game.score += 5000;
                    door.remove();
                    //DEBUG:
                    console.log("win level");
                    game.level += 1;
                    
                    if (game.level >= gameloop.levels) {
                        game.switchState("win");
                    } else {
                        game.switchState("loop");
                    }
                }
            }
        },
        {
            g1: {type: "dyn", name: "player"}, // targets
            g2: {type: "dyn", name: "mom"},
            fn: function (player, mom) {
                if (collision(player, mom)) {
                    mom.remove();
                    player.remove();
                    game.score -= Math.round(game.score/4);
                    game.switchState("loop");
                    
                    //DEBUG:
                    //console.log("caught");
                }
            }
        }
    ];

    levels = [
        //BRIAN TO SHARON:
        // you can change this to change which level is loaded
        level_1,
		level_2,
		level_3,
		level_4,
		level_5,
		level_6,  
		level_7,
		level_8,
        level_9,
        level_10
    ];
    
    rules = {
        player: {
            name: "player",
            type: "dyn",
            src: {
                def: ["res/img/kid_right_stand.png"],
                right: ["res/img/kid_right_run1.png", "res/img/kid_right_run2.png", "res/img/kid_right_stand.png"],
                left: ["res/img/kid_left_run1.png", "res/img/kid_left_run2.png", "res/img/kid_left_stand.png"],
            },
            update: function () {
                var xf,
                    yf;
            
                if(this.spdchng > 0) {
                    this.spdchng -= 1;
                    if(this.spdchng <= 0) {
                        this.speed = 2;
                        this.x = Math.round(this.x);
                        this.y = Math.round(this.y);
                    }
                }
            
                this.dy = 0;
                this.dx = 0;
            
                if (controller.getState(KEY.UP)) {
                    this.dy -= this.speed;
                }
                if (controller.getState(KEY.DOWN)) {
                    this.dy += this.speed;
                }
                if (controller.getState(KEY.RIGHT)) {
                    this.dx += this.speed;
                }
                if (controller.getState(KEY.LEFT)) {
                    this.dx -= this.speed;
                }
                
                // do collision avoidance.

                //TODO: fix the hell out of this, because this is going to be
                //      a nightmare to make sense of later.
                if((this.dx) && (function (pl) {
                    var i, j,
                    walls = gameloop.level.sta.wall.elts,
                    wall;
                    
                    pl.x += pl.dx;
                    
                    for (i = 0; i < walls.length; i += 1) {
                        wall = walls[i];
                        if (collision(pl, wall)) {
                            return true;
                        }
                    }
                    return false;
                } (this))) {
                    this.x -= this.dx;
                    this.dx = 0;
                }
                
                if((this.dy) && (function (pl) {
                    var i, j,
                    walls = gameloop.level.sta.wall.elts,
                    wall;
                    
                    pl.y += pl.dy;
                    
                    for (i = 0; i < walls.length; i += 1) {
                        wall = walls[i];
                        if (collision(pl, wall)) {
                            return true;
                        }
                    }
                    return false;
                }(this))) {
                    this.y -= this.dy;
                    this.dy = 0;
                }
                // end fix this nightmare
                
                if(this.dx || this.dy) {
                    
                    if(this.dx > 0) {
                        this.animate = "right";
                    } else if(this.dx < 0) {
                        this.animate = "left";
                    }
                    
                    xf = 2*Math.floor(this.x/2);
                    yf = 2*Math.floor(this.y/2);
                    
                    /*
                    for (i = 0; i < this.pos.length; i++) {
                        if((this.pos[i].x === xf) && (this.pos[i].y === yf)) {
                            this.pos.splice(i, this.pos.length - i);
                            break;
                        }
                    }*/
                    
                    this.pos.push({
                        x: xf,
                        y: yf
                    });

                } else {
                    this.animate = "def";
                }
                
                if (this.animate) {
                    this.frame += 1;
                    if (this.frame > this.src[this.animate].length) {
                        this.frame = 0;
                    }
                }
            },
            draw: function () {
                this.node.attr("x", this.x);
                this.node.attr("y", this.y);
                if (this.animate) {
                    this.node.attr("src", this.src[this.animate][this.frame]);
                }
            },
            init: function () {
                this.node = game.canvas.image(this.src.def[this.frame], this.x, this.y, this.width, this.height);
                this.animate = false;
                this.dx = 0;
                this.dy = 0;
                this.pos = [{
                    x: this.x,
                    y: this.y
                }];
                this.speed = 2;
                this.spdchng = 0;
            },
            remove: function () {
                if (this.node) {
                    this.node.remove();
                }
            },
            width: game.tileSize*2,
            height: game.tileSize*2
        },
        
        mom: {
            name: "mom",
            type: "dyn",
            src: {
                def: ["res/img/mom_left_run1.png"],
                left: ["res/img/mom_left_run1.png", "res/img/mom_left_run2.png"],
                right: ["res/img/mom_right_run1.png", "res/img/mom_right_run2.png"],
            },
            update: function () {
                var speed = 2;

                if(this.target && this.x === this.target.x && this.y === this.target.y) {
                    this.target = null;
                }
                
                if (!this.target) {
                    this.target = gameloop.level.dyn.player.elts[0].pos.shift();
                }
                
                if (!this.target) {
                    this.target = {
                        x: gameloop.level.dyn.player.elts[0].x,
                        y: gameloop.level.dyn.player.elts[0].y
                    };
                }
                
                if(this.x > this.target.x) {
                    this.dx = -speed;
                    this.animate = "left";
                } else if(this.x < this.target.x) {
                    this.dx = speed;
                    this.animate = "right";
                } else {
                    this.dx = 0;
                }
                
                if(this.y > this.target.y) {
                    this.dy = -speed;
                } else if(this.y < this.target.y) {
                    this.dy = speed;
                } else {
                    this.dy = 0;
                }

                if (this.animate) {
                    this.frame += 1;
                    if (this.frame > 2) {
                        this.frame = 0;
                    }
                }
                
                this.x += this.dx;
                this.y += this.dy;
                
            }, // update
            draw: function () {
                this.node.attr("x", this.x);
                this.node.attr("y", this.y);
                this.node.attr("src", this.src[this.animate][this.frame]);
            }, // draw
            init: function () {
                this.node = game.canvas.image(this.src.def[this.frame], this.x, this.y, this.width, this.height);
                this.animate = false;
                this.dx = 0;
                this.dy = 0;
                this.frame = 1;
                this.target = null;
            },
            remove: function () {
                if (this.node) {
                    this.node.remove();
                }
            },
            width: 3*game.tileSize,
            height: 3*game.tileSize
        },
        
        icecream: {
            name: "icecream",
            type: "dyn",
            src: {def: ["res/img/icecream_sm.png"]},
            update: function () {
                this.melt -= 1;
                if (this.melt === 0) {
                    this.remove();
                    game.score -= 100;
                    /*
                    (function () {
                        var can = game.canvas.image("res/img/objects/trash_can.png", 1800-54*2, 1080-63*2 , 53*2, 62*2);
                        can.animate({opacity: 0}, 2000, function () {
                            can.remove();
                        });
                        var cream = game.canvas.image("res/img/icecream_sm.png", 1800-54*2+23, 1080-2*63-36 , 50, 50);
                        cream.animate({opacity: 0, y: 1080}, 1500, function () {
                            can.remove();
                        });
                    }());
                    */
                }
            }, // update
            draw: function () {
                if (this.melt) {
                    this.node.attr("opacity", this.melt/this.solid);
                }
            }, // draw
            init: function () {
                this.solid = 150;
                this.melt = Math.round(Math.random()*3000)+500;
                this.node = game.canvas.image(this.src.def[this.frame], this.x, this.y, this.width, this.height);
            },
            remove: function () {
                if (this.node) {
                    this.node.remove();
                }
            },
            width: game.tileSize*2,
            height: game.tileSize*2
        },
    
        wall: {
            name: "wall",
            type: "sta",
            src: {def: ["res/img/wall.png"]},
            update: function () {}, // update
            draw: function () {}, // draw
            init: function () {
                this.node = game.canvas.image(this.src.def[this.frame], this.x, this.y, this.width, this.height);
            },
            remove: function () {
                if (this.node) {
                    this.node.remove();
                }
            },
            x_offset: 0,
            y_offset: 0
        },
        
        door: {
            name: "door",
            type: "sta",
            src: {def: ["res/img/objects/door_sm.png"]},
            update: function () {}, // update
            draw: function () {}, // draw
            init: function () {
                this.node = game.canvas.image(this.src.def[this.frame], this.x, this.y, this.width, this.height);
            },
            remove: function () {
                if (this.node) {
                    this.node.remove();
                }
            },
            width: 3*game.tileSize,
            height: 3*game.tileSize
        },
        
        food: {
            name: "food",
            type: "dyn",
            src: {def: ["res/img/broccoli_sm.png"]},
            update: function () {
                this.melt -= 1;
                if (this.melt === 0) {
                    this.remove();
                    game.score += 300;
                    /*
                    (function () {
                        var can = game.canvas.image("res/img/objects/trash_can.png", 1800-54*2, 1080-63*2 , 53*2, 62*2);
                        can.animate({opacity: 0}, 2000, function () {
                            can.remove();
                        });
                        var cream = game.canvas.image("res/img/broccoli_sm.png", 1800-54*2+23, 1080-2*63-36 , 50, 50);
                        cream.animate({opacity: 0, y: 1080}, 1500, function () {
                            can.remove();
                        });
                    }());
                    */
                }
            }, // update
            draw: function () {
                if (this.melt) {
                    this.node.attr("opacity", this.melt/this.solid);
                }
            }, // draw
            init: function () {
                this.solid = 1000;
                this.melt = this.solid;
                this.node = game.canvas.image(this.src.def[this.frame], this.x, this.y, this.width, this.height);
            },
            remove: function () {
                if (this.node) {
                    this.node.remove();
                }
            },
            width: 2*game.tileSize,
            height: 2*game.tileSize,
            x_offset: .5,
            y_offset: .5
        }

    };
    
    levelConstructorConfig = {

        w: {
            name: "wall"
        },
        
        p: {
            name: "player"
        },
        
        I: {
            name: "icecream"
        },
        
        M: {
            name: "mom"
        },
        
        O: {
            name: "food"
        },
        
        D: {
            name: "door"
        },
        
        X: {
            name: "wall"
        },
    };
    
    
    //TODO: make sure these are up to date with the number of levels!!
    icecreamMeltConfig = [
        // Level 1 melt times
        [1000, 5000],
        // Level 2 melt times
        []
        // etc.
    ];
    
    foodMeltConfig = [
        level_1_food,
        level_2_food,
        level_3_food,
        level_4_food,
        level_5_food,
        level_6_food,
        level_7_food,
        level_8_food,
        level_9_food
    ];
    
    objectConfig = [
        // Level 1
        [
            {img: "res/img/objects/chair.png", x: 185, y: 320, width: 70, height: 70},
            {img: "res/img/objects/TV.png", x: 1280, y: 135, width: 140, height: 140},
			{img: "res/img/objects/dining_table.png", x: 77, y: 90, width: 95, height: 100}
        ],
        // Level 2
        [
            {img: "res/img/objects/dining_table.png", x: 90, y: 100, width: 75, height: 80},
            {img: "res/img/objects/TV.png", x: 1240, y: 100, width: 140, height: 140},
            {img: "res/img/objects/couch.png", x: 330, y: 562, width: 230, height: 120}
        ],
        // Level 3
        [
			{img: "res/img/objects/dining_table.png", x: 80, y: 470, width: 95, height: 100}
		],
		  
        // Level 4
        [
            {img: "res/img/objects/tall_lamp.png", x: 930, y: 443, width: 75, height: 150},
			{img: "res/img/objects/dining_table.png", x: 400, y: 400, width: 95, height: 100}
        ],
		// Level 5
        [
            {img: "res/img/objects/plant2.png", x: 70, y: 50, width: 85, height: 100},
		  	{img: "res/img/objects/coffee_table.png", x: 985, y: 175, width: 135, height: 140},
			{img: "res/img/objects/dining_table.png", x: 1125, y: 575, width: 95, height: 100}
        ],
		// Level 6
        [
            {img: "res/img/objects/dining_table.png", x: 855, y: 430, width: 95, height: 100}
        ],
		// Level 7
        [
            {img: "res/img/objects/dining_table.png", x: 1155, y: 740, width: 95, height: 100},
			{img: "res/img/objects/toy_truck.png", x: 65, y: 880, width: 105, height: 120},
			{img: "res/img/objects/cat.png", x: 700, y: 750, width: 100, height: 75}
        ],
		// Level 8
        [
            {img: "res/img/objects/plant1.png", x: 650, y: 440, width: 80, height: 125}
        ],
		// Level 9
        [
            {img: "res/img/objects/dining_table.png", x: 780, y: 95, width: 95, height: 100},
			{img: "res/img/objects/basketball.png", x: 1300, y: 173, width: 60, height: 55},
			{img: "res/img/objects/vacuum.png", x: 95, y: 515, width: 85, height: 100},
			{img: "res/img/objects/small_table.png", x: 1000, y: 755, width: 85, height: 100}
		
        ],
		// Level 10
        [
            //{img: "res/img/objects/tall_lamp.png", x: 930, y: 443, width: 75, height: 150}
        ]
    ];

    gameloopConfig = {

        init: function () {
            // Define dynamic groups here
            //gameloop.level.dyn.enemies = theEnemies;
            
            
            // Define additional actions to take place when the game is paused.
            gameloop.pauseHandle = function () {
                game.bgm.pause();
            };
            
            gameloop.unpauseHandle = function () {
                game.bgm.play();
            };
        },
        
        inter: interactions,
        
        levels: levels,
        levelConstruct: levelConstructorConfig,
        rules: rules,
        icecreamMeltConfig: icecreamMeltConfig,
        foodMeltConfig: foodMeltConfig,
        objectConfig: objectConfig
    };

    return gameloopConfig;

}());