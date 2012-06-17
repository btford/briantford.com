var paper = Raphael("holder", 1000, 600);

var gameover = {};

gameover.bg = paper.image("gameover.png", 0, 0, 1000, 600);

gameover.score = paper.image("score.png", 360, 210, 308, 63);
gameover.try_again = paper.image("try_again.png", 400, 450, 228, 49);
gameover.main_menu = paper.image("main_menu.png", 400, 505, 219, 37);

var score_number = paper.text();

score_number.attr({
	x: 510,
	y: 350,
	text: "5000000",
	fill: "#08457E",
	font: '40px "Comic Sans MS"'
});

menu.score.node.onclick = function () {};
menu.try_again.node.onclick = function () {};
menu.main_menu.node.onclick = function () {};
