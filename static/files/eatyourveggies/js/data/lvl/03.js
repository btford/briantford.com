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
var level_3 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w                                                                     w                            w",
"w                                                                     w                        I   w",
"w                                                                     w                            w",
"w                                                                     w                            w",
"w                         wwwwwwwwwO  wwwww                           w               w            w",//1
"w                         w               w                           w               w            w",
"w                 I       w               w                           w               w            w",
"w                         w               w                           O               w            w",//2
"w                         w               w                                           w            w",
"w                         w               w                                           w            w",
"w             wwwwwwwwwwwww               w        wwwwwwwwwwwwwwwwwwww               w            w",
"w             w                           w        w                  w               w            w",
"w             w                           w        w                  w               w            w",
"w             w                           w        w                  w               w            w",
"w             w            wwwwwwwwwwwwwwww        w                  w               w            w",
"w             w            w                       w                  w               w            w",
"w             w            w                       w                  wwwwwwwwwwwO  www            w",//3
"w             w            w                       w                                  w            w",
"w             w            w         wwww          w                                  w            w",
"w             w            w         w  w          w                                  w            w",
"wwwwwwO  wwwwww            w         wwww          w                                  w            w",//4
"w             w            w    I                  w          wwwwwwwwwwwwwww         w            w",
"w             w            w                       w          w             w         O            w",//5
"wM          p wwwwwwwwO  wwwwwwwwwwwwwwwwwwwwwwwwwww          w             w                      w",//6
"w             w                 w                             w             w                      w",
"w             w                 w                             w             wwwwwwwwwwwwwwwwww     w",
"w    XXXX     w                 w                             w                              w     w",
"w    X  X     w                 w                             w                              w     w",
"w    X  X     w                 w       wwwwwO  wwwwwwwwwwwwwww                              w     w",//7
"w    XXXX     w                 w       w        w                                           w     w",
"w             w                 w       w        w                                           w     w",
"w             w                 w       w        w     I                 wwwwwO  wwwwwwwwwwwww     w",//8
"w             w                 w       w        w                       w                         w",
"w             w                 w       w        w                       w                         w",
"wwwwwwwO  wwwww                 w       w        w                       w                         w",//9
"w          w                    w       w        w                       w               I         w",
"w          w                    w       w        w                       w                         w",
"w          w                    w       w        w                       w          wwwwwwwwwwwwwwww",
"w          w                    wwwwwwwww        w                       w          w              w",
"w          w                                     w                       w          w              w",
"w          w                                     w                       w          w              w",
"w          w                                     w          wwwwwwwwwwwwww          w              w",
"w          wwwwwwwww                       I     w          w            w          w              w",
"w                  w                             w          w            w          w              w",
"w                  w                             w          w            w          w              w",
"w                  w            wwwwwwwwwwwwwwwwww          w            w          w              w",
"w                  w            w                           w            w          w            D  ",
"w                  w            w                           w            w          w               ",
"w                  w            w                           w            w          w               ",
"w                  wwwwwwwwwwwwww                           w            wwwwwwO  www              w",//10
"w                  w                                        w            w                         w",
"w                  O                                        w            w                         w",//11
"w                                                           w            w                         w",
"w                                                           w            w                         w",
"w                  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww            w                         w",
"w                                                                        w                         w",
"w                                                   I                    w                         w",
"w                                                                        w                         w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];

/*
Broc		Dis
1			8
2			3
3			5
4			1
5			9
6			7
7			6
8			10
9			2
10			11
11			4
*/
var level_3_food = [
    8*220,
    3*120,
    5*120,
    1*120,
    9*240,
    7*210,
    6*200,
    10*240,
    2*120,
    11*250,
    4*120
];