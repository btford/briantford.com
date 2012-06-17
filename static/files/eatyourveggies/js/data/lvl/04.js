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
var level_4 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w                                                                                  w               w",
"w                                                                             I    w               w",
"w                                                                                  w               w",
"w                                                                                  w               w",
"w                                                                                  w               w",
"w                                         wwwwwwwwwwwwww                           w               w",
"w                                         w            w                           w               w",
"w                                         w     I      wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  wwwww",//1
"w                                         w            w                 w                         w",
"w             wwwwO  wwwwwwwwwwwwwwwwwwwwww            O                 w                         w",//2 3
"w             w                                                          w                         w",
"w             w                                                          w                         w",
"w             w                                        w                 w            wwwwwwwwwwwwww",
"w             w                                        w                 w            w            w",
"w             w                                        w                 w            w         I  w",
"w             w                                        w                 w            w            w",
"w             wwwwwwwO  wwwwwwwwwwwwwwwwwwww           w                 w            w            w",//4
"w                 w             w          w           w                 w            w            w",
"w                 w             w          wwwwwwwwwwwwwwwwwwwww         w            w            w",
"w                 wM          p w          w                   w         w            w            w",
"w                 w             w          O                   w         w            w            w",//5
"w                 w             w                              w         w            w            w",
"w                 w    XXXX     w                              w         w            w            w",
"w                 w    X  X     w          w                   w         w            wwwO  wwwwwwww",//6
"w                 w    X  X     w          w        XXX        w         w            w            w",
"w                 w    XXXX     w          w        XXX        O         w            w            w",//7
"w                 w             w          w        XXX                  w            w            w",
"w                 w             w          w         X                   w            w            w",
"w                 w             w          w         X         w         w            w            w",
"w                 w             w          w         X         w         w            w            w",
"w                 wwwwwwwwwwwO  w          w         X         w    I    w     I      w            w",//8
"w                 w                        w                   w         w            w            w",
"w                 w                        w                   w         w            w            w",
"w                 w                        w                   wwwwwwwwwww            w            w",
"w                 O                        w                                          w            w",//9
"w                                      I   w                                          w            w",
"w                                          w                                          w            w",
"w                 wwwwwwwwwwwwwwwwwwwwwwwwww                                          w            w",
"w                                          w                                          w            w",
"w                                          w                                          w            w",
"w                                          wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww            w",
"w                                                                                                  w",
"w        wwwwwwww                                                                                  w",
"w        w      w                                                                                  w",
"w        w      w       wwwwwwwwwwwwwwwwwwww                                                       w",
"w        w      w       w          w       w                  wwwwwwwwwO  wwwwwwwwwwwwwwwwwwwwO  www",//10 11
"w        w      w       w   I      w       w                  w               w                    w",
"w        wwwwwwww       w          w       w                  w               w                    w",
"w                       w          w       wwwwwwwwwwwwwwwwwwww               w                    w",
"w                       w          w                                          w                    w",
"w    I                  w          w                                          w                    w",
"w                       w          w                                          w                    w",
"w                       w          w                                          wwwwwwwO  wwwwwwwwwwww",//12
"wwwwwwwwwwwwwwwwwwwwwwwww          w                                          w                    w",
"w                                  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                    w",
"D                                                                                                  w",
"                                                                                                   w",
"                                                                                                   w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];
/*
Broc		Dis
1			6
2			9
3			3
4			1
5			8
6			10
7			5
8			4
9			2
10			7
11			11
12			12
*/
var level_4_food = [
    6*200,
    9*200,
    3*200,
    1*200,
    8*200,
    10*200,
    5*200,
    4*200,
    2*200,
    7*200,
    11*200,
    12*200
];