var fs = require('fs');

var makeBlogRss = function (posts) {
  var genTime = (new Date()).toUTCString();
  var buf = '<?xml version="1.0"?>' +
    '<rss version="2.0">' +
    '<channel>' +
      '<title>@briantford\'s blog</title>' +
      '<link>http://briantford.com/blog/</link>' +
      '<description>@briantford\'s blog | mostly AngularJS tutorials</description>' +
      '<language>en-us</language>' +

      '<pubDate>' + genTime + '</pubDate>' +
      '<lastBuildDate>' + genTime + '</lastBuildDate>';

  posts.forEach(function (post) {
    buf += makePostRss(post);
  });

  buf += '</channel>' +
    '</rss>';

  return buf;
};

var makePostRss = function (post) {
  return '<item>' +
      '<title>' + post.title + '</title>' +
      '<link>' + post.link + '</link>' + 
      '<pubDate>' + post.date + '</pubDate>' +
    '</item>';
};

var posts = JSON.parse(fs.readFileSync('json/blog.json'));
fs.writeFileSync('out/blog.rss', makeBlogRss(posts));
