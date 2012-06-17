/*
 [space] = floor
 w = wall
 I = ice cream
 O = food
 t = table
 D = door (exit)
 p = player
 M = mom
*/
var level_6 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w                                         w                           w                    w       w",
"w                                         w                           w                    w       w",
"w                                         w                           w                    w       w",
"w         wwwwwwwwwwwwwwwwwwwwO  wwwwwwwwwwwwwwO  wwwwwwwwwwwwwO  wwwwwwwwwwwwwwwwwwwO  wwww       w",//1 2 3 4
"w         w                                               w                                w   i   w",
"w         w                                               w                                w       w",
"w         w                                               w                                w       w",
"w         w        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww         w       w",
"w         w        w                                                    w        w         w       w",
"w         w        w                                i                   w        w         w       w",
"w         w        w                                                    w        w         w       w",
"w         w        w       w                                            w        w         w       w",
"w         w        w       w                                            w        w         w       w",
"w         w        w       w                         O                  w        w         w       w",
"w         w        w       w        wwwwwwwwwwwwwwwww   wwwwwwwww       w        w         w       w",//5
"w         w        w       w        w           w        w      w       w        w         w       w",
"w         w        w       w        w           w        w      w       O        w         w       w",//6
"w         w        w       w        w           w        w      w                w         w       w",
"w         w        w       w   I    w      wwwwwwwwO  wwww      w                O         w       w",//7 8
"w         w        w       w        w      w             w      w       w                  w       w",
"w         w        w       w   O    w      w             O      w       w                  w       w",//9
"w         w        w       wwww   www      wM          p        w       w        w         w       w",//10
"w         w        w       w        w      w                    w       w        wwwwwwwwwww       w",
"w         w        w       w        w      w             w      w       w        w         w       w",
"w         w        w       w        w      w    XXXX     w      w       w        w         w       w",
"w         w        w       w        w      w    X  X     wwwO  ww       w       O          w       w",//11 12
"w         w        w       w        w   I  w    X  X     w      w       w                  w       w",
"w         w        w       w        w      w    XXXX     w      w       w                  w       w",
"w         w        w       w        w      w             w      w       w        w         w       w",
"w         w        w       w        w      w             w      w       w        w         w       w",
"w         w        w       w        w      w             w      w       w        w         w       w",//13
"w         w       O        w        w      w             w      w       w        w         O       w",//14
"w         w                w        w      wwwwwwwwwwwwwww      w       w        w                 w",
"w         w                w        w                           w       w        w                 w",
"w         wwwwwwwwww       w        w                           w       w        w         w       w",
"w         w        w       w        wwwwwwwwwwwwwwwwwwwwwwwwwwwww       w        wwwwwwwwwww       w",
"w         w        w       w                                            w        w         w       w",
"w         w    I   w       w                                            w        w      I  w       w",
"w         w        w       w                                            w        O         wwwwwwwww",//15
"w         w        w                                                                       w       w",
"w         w        w                                                                       w       w",
"w         w        w                                                             w         w       w",
"w         w        wwwwwwwwwwwO  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww     D  ",//16
"w         w                                w                                               w        ",
"w         w                                w                                               w        ",
"w         w                                w                                               w       w",
"w         w                                w                                               w       w",
"w         w        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww         O       w",//17
"w         w        w                                                             w                 w",
"w         w        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                 w",//18
"w         w                 O                                                              wwwwwwwww",
"w         w                                                                                w       w",
"w         w                                                                                w       w",
"w         wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww       w",
"w                                                                                                  w",
"w                                                  I                                               w",
"w                                                                                                  w",
"w                                                                                                  w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];
/*
Broc		Dis
1			14
2			13
3			12
4			11
5			2
6			3
7			1
8			10
9			5
10			4
11			7
12			9
13			6
14			15
15			8
16			16
17			18
18			17
*/

var level_6_food = [
    14*150,
    13*150,
    12*150,
    11*150,
    2*150,
    3*150,
    1*150,
    10*150,
    5*150,
    4*150,
    7*150,
    9*150,
    6*150,
    15*150,
    8*150,
    16*150,
    18*150,
    17*150
];