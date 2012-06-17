
var MENU_MAIN = function () {

    var menu = {};

    game.score = 0;
    
    menu.bg = game.canvas.image("res/img/menu/title.png", 0, 0, 1800, 1080);

    menu.startgame = game.canvas.image("res/img/menu/start.png", 400+385, 400+330 , 239, 41);
    //menu.highscores = game.canvas.image("res/img/menu/highscores.png", 400+390, 400+375, 231, 42);
    menu.instructions = game.canvas.image("res/img/menu/instructions.png", 400+380, 400+425, 252, 35);
    
    //menu.credits = game.canvas.image("res/img/menu/credits.png", 400+430, 400+475, 144, 35);

    
    menu.startgame.attr({
        cursor: "pointer"
    });
    /*
    menu.highscores.attr({
        cursor: "pointer"
    });
    */
    menu.instructions.attr({
        cursor: "pointer"
    });
    /*
    menu.credits.attr({
        cursor: "pointer"
    });
    */
    
    menu.startgame.node.onclick = function () {
        game.switchState("loop");
    };
    /*
    menu.highscores.node.onclick = function () {
        game.switchState("highscores");
    };
    */
    menu.instructions.node.onclick = function () {
        game.switchState("instructions");
    };
    /*
    menu.credits.node.onclick = function () {
        game.switchState("credits");
    };
    */

    return [menu.bg, menu.startgame, menu.highscores, menu.instructions, menu.credits];
};
