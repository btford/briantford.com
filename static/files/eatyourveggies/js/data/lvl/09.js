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
var level_9 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwD  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w      w         w          w          w             w                                             w",
"w      w         w          O          w             w                                             w",//1
"w      w         w                     wM          p w                                             w",
"w      w         w                     w             w                                             w",
"w      w         O          wwwwwwwwwwww             w           wwwwwwwwwwwwwwwwwwwwwww           w",//2
"w      w                    w          w    XXXX     w           w                     w           w",
"w      w                    w          O    X  X     O           w                I    w           w",//3 4
"w      w         w          w               X  X                 w                     w           w",
"w      O         w          w               XXXX                 w                     w           w",//5
"w                w          w          w             w           w       XX            w           w",
"w                w          w          w             wwwwwwwwwwwww       XX            w           w",
"w      w         w          w          w             w           w                     w           w",
"w      w         w          w          w             w           w                     w           w",
"w      wwwwwwwwwww          w          wwwwwwwwwwwwwww           w                     w           w",
"w           w               w                                    w                     w           w",
"w           w               w                                    wwwwwO  wwwwwwwwwwwwwww           w",//6
"w           w     I         w                                    w                                 w",
"w           w               w                                    w                                 w",
"w           w               w                                    w                                 w",
"w           wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww               wwwwwwwwwwwwwwwwwww",
"w              w                            w          w         w               w                 w",
"w              O                            w          w         w               w                 w",//7
"w                                       I   w          w         w               w             I   w",
"w                                           w          w         w               w                 w",
"w              w                            w          w         w               w                 w",
"w              wwwwwwwwwwwwwwwwwwwwwwwwwwwwww          w         w               w                 w",
"w                                       w              w         O               wwwwwwww          w",//8
"w                                       w              w                                w          w",
"w      XX                               w              w                                w          w",
"w      X             wwwwwwwwwwwwwwwwwwww              w         w                      w          w",
"w      X             w                  w              w         w                      w          w",
"w     XX             w                  w              w         wwwwO  wwwwwww         w          w",//9
"w       X            w                  w              w         w            w         w          w",
"w                    w                  w              w         w            w         wwwwwO  wwww",//10
"w                    w                  wwwO  wwwwwwwwww         w            w                    w",//11
"w                    w                               w           w            w                    w",
"w                    w                          I    w           w            w                    w",
"w      wwwwwwwwwwwwwww                               w           w            w                    w",
"w      w                                             w           w            wwwwwwwwwwwwwwwwwwwwww",
"w      w                           wwwwwwwwwwwwwwwwwww           w                                 w",
"w      O                                     w                   w                                 w",//12
"w                                            w            X      w                                 w",
"w                                            w           XX      w                                 w",
"w      w                                     w           XX      w                                 w",
"w      w                                     w           XX      wwwwwwwwwwwwwwwwwwwwwwwO  wwwwwwwww",//13
"w      w       wwwwwwwwwwwwwww               w           XX                          w             w",
"w      w                     w               w                                       w             w",
"w      w                     w               w                                       w             w",
"w      w                     w               w                                       w             w",
"w      w                     w           wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  wwwwwwwwwwwwwwwwwwwwwwww",//14
"w      wwwwwwwwwwwwwww       w           w                 w                               w       w",
"w                    w       w           O                 O                               w       w",//15 16
"w                    w       w                                                             w       w",
"w                    w       w                                                             w       w",
"wwwwwwwwwwwwwwwwwwwwww       wwwwwwwwwwwww                 wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww       w",
"w                                                          O                                       w",//17
"w         I                                                                       I                w",
"w                                                                                                  w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];
/*
Broc		Dis
1			17
2			16
3			1
4			2
5			15
6			3
7			14
8			7
9			5
10			4
11			12
12			13
13			6
14			8
15			11
16			9
17			10
*/

var level_9_food = [
    17*140,
    16*140,
    1*140,
    2*140,
    15*140,
    3*140,
    14*140,
    7*140,
    5*140,
    4*140,
    12*140,
    13*140,
    6*140,
    8*140,
    11*140,
    9*140,
    10*140
];