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
var level_5 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w                 w               w                                                                w",
"w             I   w               w                                                                w",
"w                 w               w                                                                w",
"w                 wwwwwwwwwwwwwwwww                                                                w",
"w    XX           w               w           wwwwwwwwwwwwwwwwwwwwwwwwO  wwwwwwwwwO  wwwwww        w",//1 2
"w    XX           w               w           w                   w             w         w        w",
"w    XX           w               w           w                   w             w         w        w",
"w                 w       wwwwwwwwwwO         w             I     w             w         w   I    w",//3
"w                 w       w           w       w                   w             w         w        w",
"w                 w       w           w       w                   wwwwwwwwwwwwwwwwwwwwwO  wwwwwwwwww",//4
"wwwwO  ww         w       w           w       w                   w                w               w",//5
"w       w         w       w           w       w                   w                w               w",
"w       w         w       w           w       w        XXXXXXX    w                w               w",
"w       w         w       w           w       w        X     X    w                w               w",
"w       w                 w           w       w        XXXXXXX    w                w               w",
"w       w                 w           w       w                   w          wwwwwwwwwwwwwww       w",
"w       w                 w           w       w                   w          w             w       w",
"w       w                 w           w       w                   w          w             w       w",
"w       w                 w           w       w                   w          w             w       w",
"w       wwwwwwwwwwwwwwwwwww           w       w             wwwwwwwwwwO  wwwwwwwwww        w       w",//6
"w           w                         w       w             w                     w        w       w",
"w           w                         w       w             w                     w        O       w",//7
"w           O                         wwwwwwwww             w                     w                w",//8
"w                                  I  w                     O                     w                w",//9
"w                                     w                                           w        wwwwwwwww",
"w           wwwwwwwwwwwwwwwwwwwwwwwwwww                                           w        w       w",
"w           w    w                    w                   wwwwwwwO  wwwww         w        O       w",//10 11
"w           w    w                    w                   w             w         w                w",
"w           w    w                    w                   w             w         w                w",
"w           w    w                    w                   wM          p wwwwwwwwwwwwwwwwwwwwwwwO  ww",//12
"w           w    wwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  wwwwwwwwww             w            w             w",//13
"w           w              w                              w             w        I   w           D  ",
"w           w              w                              w    XXXX     w            w              ",
"w           w              w                              O    X  X     w            w              ",//14
"w           w              w                                   X  X     wwwO  wwwwO  wwwwwwwwwwwwwww",//15 16
"w           w              w                                   XXXX     w       w       w          w",
"w           w              w         wwwwwwwwwwwwwwwwwwwwww             w       w       w          w",
"w           w              w                              w             w       w       w          w",
"w           w              w                              w             w       w       w          w",
"wwwO  wwwwwww              w                              w             w       w       w          w",//17
"w           w              wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  wwwww       w       w          w",//18
"w           O                  w                                                w       w          w",//19
"w                              w                                                w       w          w",
"w                              w                                                w       w          w",
"w           wwwwwwwwwwwwwwwwwwww                                                        w          w",
"w                              w       wwwwwwwwwwwwwwww                                 w          w",
"w                              w       w              w                                 w          w",
"w                              w       w              w            wwwwwwwwwwwwwwwwwwwwww          w",
"wwwwwwOwwwwwwwwwwwwwwwwwwwwwwwww       w              O            w                               w",//20
"w                w         w           w                           w                               w",
"w                w         w           w                           w    I                          w",
"w                w         w           w              w            w                               w",
"w                w         w    I      w              w            w                               w",
"w                w         w           w         wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww          w",
"w                O         wwwwwwwwwwwww                     w                                     w",//21
"w                                                            O                                     w",//22
"w   I                                                                                              w",
"w                w                                                                                 w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];
/*
Broc		Dis
1			17
2			18
3			16
4			19	
5			14
6			5
7			20
8			15
9			3
10			2
11			21
12			22
13			4
14			1
15			8
16			9
17			13
18			6
19			12
20			7
21			11
22			10
*/

var level_5_food = [
    17*150,
    18*150,
    16*150,
    19	*150,
    14*150,
    5*150,
    20*150,
    15*150,
    3*150,
    2*150,
    21*150,
    22*150,
    4*150,
    1*150,
    8*150,
    9*150,
    13*150,
    6*150,
    12*150,
    7*150,
    11*150,
    10*150
];