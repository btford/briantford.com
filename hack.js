var highlight = require('eshighlight');
var marked    = require('marked');
var renderer  = new marked.Renderer();

// anchors for headings
renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  if (level === 1) {
    return '<h1>' + text + '</h1>';
  }

  return '<h' + level + '><a name="' +
                escapedText +
                 '" class="anchor" href="#' +
                 escapedText +
                 '"><span class="header-link"></span></a>' +
                  text + '</h' + level + '>';
};

marked.setOptions({
  gfm: true,
  tables: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  highlight: function (code, language) {
    if (language === 'javascript') {
      return highlight(code);
    } else {
      return code;
    }
  },
  renderer: renderer
});

module.exports = function (env) {
  env.addFilter('markdown', function (str) {
    return marked(str);
  });

  env.addFilter('json', function (str) {
    return JSON.stringify(str, null, 2);
  });
};
