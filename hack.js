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
  var blogs;

  env.addFilter('markdown', function (str) {
    return marked(str);
  });

  env.addFilter('json', function (str) {
    return JSON.stringify(str, null, 2);
  });

  env.addFilter('shortDate', function (str) {
    var date = str instanceof Date ? str : new Date(str);
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    return [
      date.getUTCFullYear(),
      month < 10 ? ('0' + month) : month,
      day < 10 ? ('0' + day) : day
    ].join('.');
  });

  env.addPreprocess(function (pages) {
    return pages.
      map(authorshipAccordingToGit).
      map(extractMetadata).
      map(extractTitle).
      map(extractDate);
  });

  env.addPrerender(function (data) {
    data.blogs = blogs || (blogs = getListOfBlogThings(data.pages));
  });
};

function authorshipAccordingToGit (page) {
  var shas = Object.keys(page.shas).
      filter(function (sha) {
        return sha !== 'fs';
      }).
      sort(function (a, b) {
        return page.shas[a].date - page.shas[b].date;
      });

  var firstSha  = shas[0];
  page.authored = page.shas[firstSha].date;

  if (shas.length > 1) {
    var lastSha   = shas[shas.length - 1];
    page.updated  = page.shas[lastSha].date;
  }
  return page;
}

function getListOfBlogThings (pages) {
  return pages.filter(function (page) {
    return page.outPath.match(/^blog\/[^\/]+\/index\.html$/);
  }).
  map(function (page) {
    page.permalink = page.outPath.substr(0, page.outPath.length - 11);
    return page;
  }).
  sort(function (a, b) {
    return a.authored > b.authored ? -1 : 1;
  });
}

// all @foo bar key-pairs
function extractMetadata (page) {
  var re = /@(.+?) (.+?)\n/g;
  page.content = page.content.replace(re, function (m, g1, g2) {
    page[g1] = g2;
    return '';
  });
  return page;
}

var DATE = /\<span class="date"\>\[(.+?)\]\<\/span\>/;
function extractDate (page) {
  page.content = page.content.replace(DATE, function (full, date) {
    page.authored = page.authored || date;
    return '';
  });
  return page;
}

var TITLE = /#[ ]?(.+)/;
function extractTitle (page) {
  page.content = page.content.replace(TITLE, function (full, title) {
    page.title = page.title || title;
    return '';
  });
  return page;
}
