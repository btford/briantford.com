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
var level_2 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w             w                                           w                                        w",
"w             w                                           w                                        w",
"wM          p w                                           w                                I       w",
"w             w          wwwwwwwwwwwwwwwwwwwwwwwww        w                                        w",
"w             w          w                       w        w                                        w",
"w    XXXX     w          w                       w        w           XXXXXX                       w",
"w    X  X     w          w                       w        w           X    X                       w",
"w    XXXX     w          w     I                 w        w           X    X                       w",
"w    XXXX     w          w                       w        w           X    X                       w",
"w             w          wwwwwwwwwwwwwww         w        w           X    X                       w",
"w             O                                  w        w           XXXXXX         wwww          w",//1 
"w                                                w        w                          w  w          w",
"w                                                w        w                          w  w          w",
"wwwwO  wwwwwwwwwwwwwwwwwwwwwwwwwwwww             w        w                          wwww          w",//2
"w                                  w             w        w                 I                      w",
"w                                  w             w        w                                        w",
"w                                  w             w        w                                        w",
"w       wwwwwwwwwwwwwwwwwww        wwwwwwwO  wwwwwwwwwwwwwwwwwwwwwwwO  wwwww                       w",//3 4
"w                         w        w             w                         w                       w",
"w                         w        w             w                 I       w     wwwwwwwwwwwww     w",
"w                         w        w             w                         w     w           w     w",
"w       wwwwwwwwwwwwwwwwwww        w             w                         w     w           w     w",
"w                                  O             w                         w     w           w     w",//5
"w                I                               w                         w     w           w     w",
"w                                                w                         w     w           w     w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww             w                         w     w           w     w",
"w                                                w                         w     w           w     w",
"w                                                w             wwwwwwwww   w     w           w     w",
"w     I                                          w             w       w   w     w           w     w",
"w                                                w             w       w   w     w           w     w",
"w                                                w             w       w   w     w           w     w",
"w                    XXXXXXXXX                   w             w       w   w     w           w     w",
"w                    X       X                                 wwwwwwwww   w     wwwwwwwwwwwww     w",
"w                  XXX       X                                             w                       w",
"w                  XXXXX     X                                             w                       w",
"w                       X    X                                             O                     D  ",//6
"w                         X                                                                         ",
"w                                                                                                   ",
"w                                                                          wwwwwwwwwwwwwwO  wwwwwwww",//7
"w                                                                          w                       w",
"wwwwwwwwwwwwwwwwwwwwwwwO  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  wwwwwwwwwww                       w",//8 9
"w                                w                                   w                             w",
"w                                O                                   w                             w",//10
"w                                                         I          w                             w",
"w                                                                    O                             w",//11
"w          wwwwwwwwwwwwwwwwwwwwwww                                                     wwwwwwwwwwwww",
"w          w                     w                                                            I    w",
"w          w                     w                                   wwwwwwwwwwwwww                w",
"w          w    I                w            wwwwww                 w            w                w",
"w          w                     w            w    w                 O            w                w",//12
"w          w                     w            w    w                              w        wwwwwwwww",
"wwwwwwwwwwww                     w            w    w                              w        w       w",
"w                                w            w    w                 w            w        w       w",
"w                                O            wwwwww                 w            wwwwwwwwww       w",//13
"w                                                                    w                             w",
"w                                                                    w                             w",
"w                                w                                   w                             w",
"w                                w                                   w                             w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];

/* 
Broc		Dis
1			2
2			1
3			3
4			8
5			4			
6			10	 
7			11
8			6
9			5
10			9
11			13
12			12
13			7
*/
var level_2_food = [
2*120,
1*120,
3*120,
8*120,
4*120,		
10*120,
11*120,
6*120,
5*120,
9*120,
13*120,
12*120,
7*120
];