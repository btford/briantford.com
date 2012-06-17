// compile jade, including scripts properly

var fs = require('fs'),
  jade = require('jade'),
  _ = require('underscore');

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

    var locals = {};
    
    try {
      locals = JSON.parse(fs.readFileSync(jadeBase + dir + '/' + page + '.json'));
    } catch (e) {
      //console.warn('cannot read: ' + __dirname + '/json/' + page + '.json');
    }
    
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
