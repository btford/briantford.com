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
var level_1 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w             w                                          w                                         w",
"w             w                                          w                                         w",
"wM          p O                                          w                                         w",//1
"w                                                        w                                         w",
"w                                         I              O                                         w",//2
"w    XXXX     w                                                                                    w",
"w    X  X     w                                                                                    w",
"w    X  X     w                                          w              XXXXXX                     w",
"w    XXXX     w                                          w              X    X                     w",
"w             w                                          w              X    X                     w",
"w             w                                          w              X    X                     w",
"w             w                                          w              X    X                     w",
"w             w                                          w              XXXXXX                     w",
"wwwwwwwwwwwwwww                                          w                                         w",
"w                                                        w                             I           w",
"w                                                        w                                         w",
"w                                                        O                                         w",//3
"w          XXX                                                                                     w",
"w          XXX                                                                                     w",
"w          XXX                                           w                                         w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  wwwwwwwwwwwwwwwwww",//4 5
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                                        O                                         w",//6
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                        wwwwwwwwwwwwwwww                          w",
"w             wwwwwwwwwwwwwww                            w              w                          w",
"w             w             w                            w              w                          w",
"w             w             w                            w              w                          w",
"w             w             w                            w              w                          w",
"w             w             w                            w              w              I           w",
"w      I      w             w                            w              w                          w",
"w             w             w                            w              w                          w",
"w             w             w                            w              w                          w",
"w             w             w                            w              w                          w",
"w             wwwwwwwwwwwwwww                            w              w                          w",
"w                                                        w              w                          w",
"w                                                        w              w                          w",
"w                                                        w              w                          w",
"w                                                        wwwwwwwwwwwwwwww                          w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                                        O                                         w",//7
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                        w                                         w",
"w                                                        w                                         w",
"w                                  D                     w                                         w",
"w                                                        w                                         w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww   wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];

/*
Broc		Dis
1			1
2			2
3			4
4			3
5			5
6			6
7			7
*/

var level_1_food = [100, 400, 1300, 1100, 700, 1500, 2000];