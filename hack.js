var eshighlight = require('eshighlight');
var hljs        = require('highlight.js');
var marked      = require('marked');
var renderer    = new marked.Renderer();

hljs.configure({
  classPrefix: ''
});

// anchors for headings
renderer.heading = function (text, level) {
  if (level === 1) {
    return '<h1><a href="../">«</a> ' + text + '</h1>';
  }

  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

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
    try {
      if (language === 'javascript') {
        return eshighlight(code);
      } else if (language) {
        if (language === 'shell') {
          language = 'bash';
        }
        if (language === 'json') {
          language = 'javascript';
        }
        return hljs.highlight(language, code).value;
      }
    } catch (e) {
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

  env.addPrerender(function (data) {
    data.blogs = data.pages.filter(function (page) {
      return page.outPath.match(/^blog\/.+\/index\.html$/);
    }).map(function (page) {
      page.permalink = page.outPath.substr(0, page.outPath.length - 11);
      page.authored = getDate(page.content);
      return page;
    }).sort(function (a, b) {
      return a.authored > b.authored ? -1 : 1;
    });
  });

};

var DATE = /\<span class="date"\>\[(.+?)\]\<\/span\>/;

function getDate (markdown) {
  return (markdown.match(DATE) || [])[1] || '';
}
