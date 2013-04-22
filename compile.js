// compile jade, including scripts properly

var fs = require('fs'),
  jade = require('jade'),
  _ = require('underscore'),
  moment = require('moment'),
  marked = require('marked'),
  hljs = require('highlight.js');

var highlight = function(code, lang) {
  if (lang === 'shell') {
    lang = 'bash';
  }
  if (lang === 'html') {
    lang = 'http';
  }
  if (lang === 'jade') {
    return code.replace(/&/g,'&amp;').
      replace(/</g,'&lt;').
      replace(/>/g,'&gt;').
      replace(/"/g, '&quot;').
      replace(/'/g, '&#39;').
      replace(/\n/g, '\\n');
  }
  return hljs.highlight(lang || 'bash', code).value;
};

marked.setOptions({
  gfm: true,
  tables: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  highlight: highlight
});

jade.filters.markdown = marked;

['javascript', 'jade', 'css', 'html'].forEach(function (lang) {
  jade.filters[lang] = function (code) {
    return '<pre><code>' + highlight(code, lang) + '</code></pre>';
  };
});

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


  // jade pages
  // ------------------------------------------------

  _.each(pages, function (page) {
    page = page.substr(0, page.length - 5);
    var filename = jadeBase + dir + '/' + page + '.jade';
    var template = fs.readFileSync(filename);

    var jadeFn = jade.compile(template, {
      filename: filename
    });

    var locals;

    try {
      locals = JSON.parse(fs.readFileSync(jadeBase + dir + '/' + page + '.json'));
    } catch (e) {} //idc lol
    if (!locals) {
      locals = {};
    }
    locals.posts = JSON.parse(fs.readFileSync('json/blog.json'));
    locals.posts.forEach(function (post) {
      post.date = moment(post.date).format('YYYY.MM.DD');
    });

    //locals.title = filename.substr(0, -5);

    var output = jadeFn(locals);
    var outFilePath = outBase + dir + '/' + page + '.html';

    fs.writeFileSync(outFilePath, output);
    console.log('Finished ' + dir + '/' + page + '.html');
  });

  // markdown pages
  // ------------------------------------------------

  var down = _.filter(contents, function (file) {
    return file.substr(-3) === '.md';
  });

  _.each(down, function (page) {
    page = page.substr(0, page.length - 3);

    var template = fs.readFileSync(jadeBase + '/templates/blog.jade');

    var jadeFn = jade.compile(template);

    var locals;

    try {
      locals = JSON.parse(fs.readFileSync(jadeBase + dir + '/' + page + '.json'));
    } catch (e) {} //idc lol
    if (!locals) {
      locals = {};
    }
    locals.body = marked(fs.readFileSync(jadeBase + dir + '/' + page + '.md', 'utf8'));
    locals.posts = JSON.parse(fs.readFileSync('json/blog.json'));
    locals.posts.forEach(function (post) {
      post.date = moment(post.date).format('YYYY.MM.DD');
    });

    var output = jadeFn(locals);
    var outFilePath = outBase + dir + '/' + page + '.html';

    fs.writeFileSync(outFilePath, output);
    console.log('Finished ' + dir + '/' + page + '.html');
  });

  // recursively compile each dir
  // ------------------------------------------------

  var dirs = _.filter(contents, function (file) {
    return file.indexOf('.') === -1 && excludes.indexOf(file) === -1;
  });

  _.each(dirs, function (subdir) {
    compile(dir + '/' + subdir);
  });

};

compile('');
