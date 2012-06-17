var $duff = function (f, its) {
	
	its = its ||  10;
	
	var ret = "function (arr) {"
		+ "var len = arr.length,"
		+ "pos = 0;"
		+ "switch (len % " + its + ") {",
		
		i;
	
	f = f.toString();
	f = f.replace(/(param)/g, "arr[pos++]");
	
	for (i = (its -1); i > 0; i -= 1) {
		ret += "case " + i + ": " + f + ";";
	}
	
	ret += "case 0: } while (pos < len) { ";
	
	for (i = 0; i < its; i += 1) {
		ret += f + ";";
	}
	
	ret += "}};";

	return (function () {
	   return (ret);
	}());
};

$duff("console.log(param)");

var duff = function (arr) {
	
	var len = arr.length,
		pos = 0;
	
	switch (len % 10) {
		case 9: f(arr[pos++]);
		case 8: f(arr[pos++]);
		case 7: f(arr[pos++]);
		case 6: f(arr[pos++]);
		case 5: f(arr[pos++]);
		case 4: f(arr[pos++]);
		case 3: f(arr[pos++]);
		case 2: f(arr[pos++]);
		case 1: f(arr[pos++]);
		case 0:
	}
	
	while (pos < len) {
		f(arr[pos++]);
		f(arr[pos++]);
		f(arr[pos++]);
		f(arr[pos++]);
		f(arr[pos++]);
		f(arr[pos++]);
		f(arr[pos++]);
		f(arr[pos++]);
		f(arr[pos++]);
		f(arr[pos++]);
	}
}