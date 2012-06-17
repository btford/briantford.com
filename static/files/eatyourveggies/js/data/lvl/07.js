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
var level_7 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwD  wwwwwwwww",
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                                       w                          w",
"w                                                                     w                            w",
"w                                                                   w                              w",
"w                                                                 w                                w",
"w                                                                ww                                w",
"w                                                                 w                                w",
"w                                                                   w          w                   w",
"w                                        w                            w      w             w       w",
"w                                      w                                w  w             w         w",
"w                                    w                                    w            w           w",
"w                                  w                                        w        w             w",
"w                                ww                                           w    w               w",
"w                                 w             w                               ww                 w",
"w                                   w         w                                                    w",
"w                                     w     w              w                                       w",
"w                                       w w              w                                         w",
"w             w                           w            w                                           w",
"w              w                            w        w                                             w",
"w               w                             w    w                                               w",
"w                w                              ww                                                 w",
"w                 w                                                                                w",
"w                  w                                                                               w",
"w                   w             w                                                                w",
"w                    w          w                                                                  w",
"w                     w       w                                                                    w",
"w                      w    w                                                                      w",
"w                       www                                                                        w",
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                                                                  w",
"wwwwO  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",//1
"w         w                     w                           w             w                        w",
"w         w                     w                           w             w                        w",     
"w         w                     w                           wM          p w                        w",
"w         w     I               w               I           w             w                     I  w",
"w         w                     w        X                  w    XXXX     w                        w",
"w         w                     w      XXXXX                w    X  X     w                        w",
"w         wwwwwwwwwwwww         w      XXXXX                w    X  X     w          wwwwwwwwwwwwwww",
"w                     w         w                           O    XXXX     w          O             w",//2 3
"w                     w         w                                         w                        w",
"w                     w         w                                         w                        w",
"w                     w         wwwwwwwwwwwwwwwwwwwwwwwO  www             w          w             w",//4
"w                     w                w          w         w             wwwwwwwwwwwwww           w",
"w    XXXX             w                O          w         w             w            w           w",//5
"w   X   X             O                           w         wwwwwwwwwwwwwww            w           w",//6
"w   X   X                                         w                                    w           w",
"w   XXXX                               w          w                                    w           w",
"w                     w                w          w                                    w           w",
"w                     wwwwwwwwwwwwwwwwww          wwwwwwwwwwwwwwO  wwwwwwwwwwwwwwwwwwwww           w",//7
"w                                      w                                                           w",   
"w                                      w                                                           w",
"w                                      w                                                           w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];
/*
Broc		Dis
1			7
2			1
3			4
4			2
5			5
6			6
7			3
*/

var level_7_food = [
7*140,
1*140,
4*140,
2*140,
5*140,
6*140,
3*140
];