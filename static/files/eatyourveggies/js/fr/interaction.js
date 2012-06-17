// Constructor
// function to be called on pair of members of each group
var Interaction = function (arg1, arg2, arg3) {

    var inter = {},
        group1,
        group2,
        fn,
        i, j;

    if (typeof arg3 === "undefined") {
    
        group1 = arg1.elts;
        fn = arg2;
    
        // Public
        inter.update = function () {
        
            for (i = 0; i < (group1.length - 1); i += 1) {
                for (j = i + 1; j < group1.length; j += 1) {
                    fn(group1[i], group1[j]);
                }
            }
            
        };
        
    } else {
        group1 = arg1.elts;
        group2 = arg2.elts;
        fn = arg3;
    
        // Public
        inter.update = function () {
        
            for (i = 0; i < group1.length; i += 1) {
                for (j = 0; j < group2.length; j += 1) {
                    fn(group1[i], group2[j]);
                }
            }
            
        };
    }
    
    return inter;
};