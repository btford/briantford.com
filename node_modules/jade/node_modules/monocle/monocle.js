var fs          = require('fs');
var readdirp    = require('readdirp');
var is_windows  = process.platform === 'win32';

module.exports = function() {
  var watched_files       = {};
  var watched_directories = {};
  var check_dir_pause     = 1000;
  var checkInterval       = undefined;

  // @api public
  // Watches the directory passed and its contained files
  // accepts args as an object.

  // @param root(string): the root directory to watch
  // @param fileFilter(array): ignore these files
  // @param directoryFilter(array): ignore these files
  // @param listener(fn(file)): on file change event this will be called
  // @param complete(fn): on complete of file watching setup
  function watchDirectory(args) {
    readdirp({ root: args.root, fileFilter: args.fileFilter, directoryFilter: args.directoryFilter }, function(err, res) {
      res.files.forEach(function(file) {
        watchFile(file, args.listener, args.partial);
      });
      typeof args.complete == "function" && args.complete();
    });

    !args.partial && (checkInterval = setInterval(function() {checkDirectory(args)}, check_dir_pause));
  }

  // @api public
  // Watches the files passed
  // accepts args as an object.
  // @param files(array): a list of files to watch
  // @param listener(fn(file)): on file change event this will be called
  // @param complete(fn): on complete of file watching setup
  function watchFiles(args) {
    args.files.forEach(function(file) {
      var o = {
            fullPath: fs.realpathSync(file),
            name: fs.realpathSync(file).split('/').pop()
          };
      o.fullParentDir = o.fullPath.split('/').slice(0, o.fullPath.split('/').length - 1).join('/')

      watchFile(o, args.listener);
    });

    typeof args.complete == "function" && args.complete();
  }

  function unwatchAll() {
    if (is_windows) {
      Object.keys(watched_files).forEach(function(key) {
        watched_files[key].close();
      });
    } else {
      Object.keys(watched_files).forEach(function(key) {
        fs.unwatchFile(key);
      });
    }

    clearInterval(checkInterval);
    watched_files       = {};
    watched_directories = {};
  }

  // Checks to see if something in the directory has changed
  function checkDirectory(args) {
    Object.keys(watched_directories).forEach(function(path) {
      var lastModified = watched_directories[path];
      fs.stat(path, function(err, stats) {
        var stats_stamp = (new Date(stats.mtime)).getTime();
        if (stats_stamp != lastModified) {
          watched_directories[path] = stats_stamp;
          watchDirectory({
            root: path,
            listener: args.listener,
            fileFilter: args.fileFilter,
            directoryFilter: args.directoryFilter,
            partial: true
          });
        }
      });
    });
  }

  // Watches the file passed and its containing directory
  // on change calls given listener with file object
  function watchFile(file, cb, partial) {
    storeDirectory(file);
    if (!watched_files[file.fullPath]) {
      if (is_windows) {
        (function() {
          var _file = file;
          watched_files[_file.fullPath] = fs.watch(_file.fullPath, function() {
            cb(_file);
          });
          partial && cb(_file);
        })();
      } else {
        (function() {
          var _file = file;
          watched_files[_file.fullPath] = true;
          fs.watchFile(_file.fullPath, {interval: 150}, function() {
            cb(_file);
          });
          partial && cb(_file);
        })();
      }
    }
  }

  // Sets up a store of the folders being watched
  // and saves the last modification timestamp for it
  function storeDirectory(file) {
    var directory = file.fullParentDir;
    if (!watched_directories[directory]) {
      fs.stat(directory, function(err, stats) {
        watched_directories[directory] = (new Date(stats.mtime)).getTime();
      });
    }
  }

  return {
    watchDirectory: watchDirectory,
    watchFiles: watchFiles,
    unwatchAll: unwatchAll
  };
}
