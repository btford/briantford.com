
var INSTRUCTIONS = function () {
    
    var instructionspage = {};

    instructionspage.bg = game.canvas.image("res/img/menu/instructionspage.png", 0, 0, 1800, 1080);

    instructionspage.main_menu = game.canvas.image("res/img/menu/main_menu.png", 400+410, 430+525, 219, 37);
        

    instructionspage.main_menu.attr({
        cursor: "pointer"
    });
        
    instructionspage.main_menu.node.onclick = function () {
        game.switchState("main");
    };
    
    return [];
};