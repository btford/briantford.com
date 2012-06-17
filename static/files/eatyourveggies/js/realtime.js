/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, browser: true, devel: true */
/*global Raphael: false, Gameloop: false, Group: false, game: false, Entity: false, State: false, Interaction: false, Audio: false, collision: false, controller: false, KEY: false, Level: false, gameloopConfig: false */

// Example game file

// State: gameloop
///////////////////////////////////////////////////////////////////////////////

var gameloop = new Gameloop(gameloopConfig);

// Setup game states
game.states = {
    main: new Menu(MENU_MAIN),
    highscores: null,
    instructions: new Menu(INSTRUCTIONS),
    credits: null,
    win: new Menu(VICTORY),
    loop: gameloop, // game loop state
    gameover: null
};

// Audio file not included
game.bgm = new Audio(); //("res/aud/bgm.mp3");

game.start();
