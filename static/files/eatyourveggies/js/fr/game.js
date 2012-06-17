// Root-level object for the game
var game = (function () {
    var game = {},
        initial = "main",
        active;
            
    // Raphael-based container
    // holder is part of the html
    game.tileSize = 18;
    game.canvas = new Raphael("holder", 100*game.tileSize, 60*game.tileSize);

    // Added in game definition
    game.states = {};
    
    game.level = 0;
    game.score = 0;
        
    game.bgm = null;
    
    game.levels = [];
        
    // Public
    game.start = function () {
        active = initial;
        game.states[active].start();
    };
    
    game.switchState = function (state) {
        if (game.states[state]) {
            if(game.bgm) {
                game.bgm.pause();
                game.bgm = null;
            }
            game.states[active].end();
            active = state;
            
            game.states[active].start();
        } else {
            console.log("Attempted to enter nonexistent state '" + state + "'");
        }
    };
    
    game.getState = function () {
        return game.states[active];
    };
    
    return game;
    
}());
