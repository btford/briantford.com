
var VICTORY = function () {
    var victory = {};

    victory.bg = game.canvas.image("res/img/menu/victory.png", 0, 0, 1800, 1080);

    victory.score = game.canvas.image("res/img/menu/score.png", 400+350, 400+300, 308, 63);

    var score_number = game.canvas.text();

    score_number.attr({
        x: 400+500,
        y: 400+425,
        text: (game.score>0?game.score:0),
        font: '40px "Comic Sans MS"',
        fill: "#08457E"
    });
        
        
    victory.main_menu = game.canvas.image("res/img/menu/main_menu.png", 400+410, 400+525, 219, 37);
        

    victory.main_menu.attr({
        cursor: "pointer"
    });
        

    victory.main_menu.node.onclick = function () {
        game.switchState("main");
    };
    return [];
};