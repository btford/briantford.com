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
var level_8 = [
"wwwwwwwwwwwwD  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w                                w                           w                          O          w",//1
"w                                w                           w                                     w",
"w                                w                           w                                     w",
"wwwwwwwwwwwwwwwwwwwwwwww         w                           wwwwwwwwwwwwwwwwwwwwwwwwwwww          w",
"w                      w         w                                                      w          w",
"w                      w         w                                                   I  w          w",
"w                      w         w                                                      w          w",
"w                      w         w                  wwwwwwwwwwwwww                      w          w",
"w                      w         w                  w            w                      w          w",
"wwwwwwwwwwwwwwwwwwwwwwww         w                  w            w                      w          w",
"w                                w                  w            w                      w          w",
"w                                w                  w            w                      w          w",
"w                                w                  w            wwwwwwO  wwwww         w          w",//2
"w                                w                  w                         w         w          w",
"w                      wwwwwwwwwwwwwwwO  wwwwwwwwwwww                         w         w          w",//3
"w                      w                                                      w         w          w",
"w                      w                                                      w         w          w",
"w                      w                                                      w         w          w",
"wwwwwwO  wwwwwwwwwwwwwww                                                      w         w          w",//4
"w                      w                                                      w         w          w",
"w                      O          wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  wwwww          w",//5 6
"w                                 w                                                     w          w",
"w                                 w                                                     w          w",
"w                      w          w                                                     w          w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                                                     w          w",
"w                                                                                       w          w",
"w                                              wwwwwwwwwwwwwwwwwwwwwwww                 w          w",
"w                                              w                      w                 w          w",
"w     I                              XX        w                      w                 w          w",
"w                                    XX        w                      w                 w          w",
"w           wwwwwwwwwwwww                      w                      w                 w          w",
"w           w           w                   I  w                      w                 w          w",
"w           w           w                      w                      w                 w          w",
"w           w           wwwwwwwwwwwwwwwO  wwwwww          w           w                 w          w",//7
"w           O                                             w           w                 O          w",//8 9
"w                                                         w           w                            w",
"w                                                         w           w                            w",
"w           w                                             w           w                 w          w",
"w           w                                             w           w                 w          w",
"w           w         wwwwwwwwwwwwwww                     w           w                 w          w",
"wwwwwwwwwwwww         w             w                     w           w                 w          w",
"w           w         w             w                     w           w                 w          w",
"w           w         wM          p w                     w           w                 w          w",
"w           w         w             w                     w           wwwwwwwww         w          w",
"w           O         w             w                     w                   w         w          w",//10
"w                     w    tttt     w           w         w                   w         w          w",
"w                     w    t  t     w           w         w                I  w         w          w",
"w           w         w    t  t     w           w         w                   O         w          w",//11
"w           w         O    tttt     O           w         w                             w          w",//12 13
"w           w                                   w    I    w                             w          w",
"w           w                                   w         wwwwwwwwwwwwwwwwwwwww         w          w",
"w           w         w             w           w         w                   w         w          w",
"w           w         w             w           w         w                   w         w          w",
"w           wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                   wwwwwwwwwww          w",
"w                                         O                                                        w",//14
"w                                             I                                                    w",
"w                                                                                                  w",
"w                                         w                                                        w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];
/*
Broc		Dis
1			4 
2			12
3			11
4			14
5			13 
6			10
7			8
8			9
9			7
10			2
11			6
12			1
13			5
14			3
*/

var level_8_food = [
	4*140,
	12*140,
	11*140,
	14*140,
	13*140,
	10*140,
	8*140,
	9*140,
	7*140,
	2*140,
	6*140,
	1*140,
	5*140,
	3*140
];