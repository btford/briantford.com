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
var level_10 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w        w                                                                           w             w",
"w        w                                                                           w             w",
"w    I   w                                                                           wM          p w",
"w        wwwwwwO  wwwwwwwwwwwwwwwwwwwwwwwwwwwww                                      w             w",//1
"w        w                 w                  w         wwwwwwwwwwwwwwwwwww          w             w",
"w        w                 w                  w         w                 w          w    tttt     w",
"w        w                 w                  w         w                 w          w    t  t     w",
"w        O                 wwwwwwwwwwww       w         w                 w          w    t  t     w",//2
"w                                     w       w         w                 w          w    tttt     w",
"w                                     w       w         w                 w          w             w",
"w        w                     I      w       w         w                 w          w             w",
"w        w                            w       w         w                 w          w             w",
"w        w                            w       w         w                 w          w             w",
"w        wwwwwwwwwwwwwwwwwwwwwwwwwwwwww       w         w                 w          wwwwwO  wwwwwww",//3
"w                                             w         O                 O          w             w",//4 5
"w                                             w                                      O             w",//6
"w                                             w                                                    w",
"w                                             w         w                 w                        w",
"wO  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",//7
"w         w                                                                                        w",
"w         w                                                                                        w",
"w         w                                                                                        w",
"w         w                                                                                        w",
"w         w        wwwwO  www        wwwwO  www        wwwwO  www        wwwwO  www                w",//8 9 10 11
"w         w        w        w        w        w        w        w        w        w                w",
"w         w        w    I   w        w    I   w        w    I   w        w    I   w                w",
"w         w        w        w        w        w        w        w        w        w                w",
"w         w        w        w        w        w        w        w        w        w                w",
"w         w        w        w        w        w        w        w        w        w                w",
"w         w        w        w        w        w        w        w        w        w                w",
"w         w        w        w        w        w        w        w        w        w                w",
"w         w        w        w        w        w        w        w        w        w                w",
"w         w   I    w        w    I   w        w    I   w        w    I   w        w                w",
"w         w        w        w        w        w        w        w        w        w                w",
"w         wwwwwwwwww        wwwO  wwww        wwwwO  www        wwwwO  www        wwwwwwwwwww      w",//12 13 14
"w                                                                                           w      w",
"w                                                                                           w      w",
"w                                                                                           w      w",
"w                                                                                           w      w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwO  w",//1 
"w                                                                                                  w",
"w                                                                                                  w",
"w                                                                                                  w",
"w                  wwwwwwwwwO  wwwwwwwwwwwwwwww     wwwwwwwO  wwwwwwwwwww          wwwwwwwwwwwwwwwww",//2 3  
"w                  w      w                w            w               w          w               w",
"w                  w      w                w            w               w          w               w",
"w         wwwwwwwwww      w                w            w               w          w               w",
"w         w               w                w            w               w          wwwwwwwww       w",
"w         w               w                w            w               w                  O       w",//4 
"w         w               w            wwwwwwO  wwwwwwwww               w                          w",//5 
"w         wwwwwwwwwwwwwwwwwwwww                   w                     w                          w",
"w                             w                   O                     w          wwwwwwwww       w",//6 
"w                             w                                         w          w               w",
"w                             w                                         w          w               w",
"wwwwwwwwwwwwwwwwO  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww               w",//7 
"w                                  O                w                                              w",//8 
"w  D                                       I        w                       I                      w",
"w                                                   w                                              w",
"www   wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];
/*
Broc		Dis
1			5
2			6
3			1
4			4
5			3
6			2
7			7
8			8
9			10
10			12
11			14
12			9
13			11
14			13
  			   

1 			  
2 			 3
3 			 2 
4 			 1
5 			 6 
6 			 4
7			 7
8  		  	 8
*/

