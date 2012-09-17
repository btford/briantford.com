// compile jade, including scripts properly

var fs = require('fs'),
  jade = require('jade'),
  _ = require('underscore');

jade.filters.javascript = function (str) {
  return '<pre class="prettyprint linenums lang-js">' + str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n') + '</pre>';
};

jade.filters.jade = function (str) {
  return '<pre class="prettyprint linenums lang-html">' + str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n') + '</pre>';
};

jade.filters.css = function (str) {
  return '<pre class="prettyprint linenums lang-css">' + str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n') + '</pre>';
};

jade.filters.html = function (str) {
  return '<pre class="prettyprint linenums lang-html">' + str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n/g, '\\n') + '</pre>';
};

var jadeBase = __dirname + '/jade';
var outBase = __dirname + '/out';

var excludes = ['templates'];


var compile = function (dir) {
  var contents = fs.readdirSync(jadeBase + dir);

  var pages = _.filter(contents, function (file) {
    return file.substr(-5) === '.jade';
  });

  try {
    fs.mkdirSync(outBase + dir);
  } catch (e) {}

  _.each(pages, function (page) {
    page = page.substr(0, page.length - 5);
    var filename = jadeBase + dir + '/' + page + '.jade';
    var template = fs.readFileSync(filename);

    var jadeFn = jade.compile(template, {
      filename: filename
    });

    var locals;
  
    try {
      locals = {json: JSON.parse(fs.readFileSync('json/' + page + '.json')) };
    } catch (e) {} //idc lol
    if (!locals) {
      locals = {};
    }

    //locals.title = filename.substr(0, -5);
    
    var output = jadeFn(locals);
    var outFilePath = outBase + dir + '/' + page + '.html';

    fs.writeFileSync(outFilePath, output);
    console.log('Finished ' + dir + '/' + page + '.html');
  });

  // recursively compile each dir
  var dirs = _.filter(contents, function (file) {
    return file.indexOf('.') === -1 && excludes.indexOf(file) === -1;
  });
  
  _.each(dirs, function (subdir) {
    compile(dir + '/' + subdir);
  });

};

compile('');
