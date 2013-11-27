#!/usr/bin/env node

/*!
 * statmap
 * Output recursive directory stats as JSON for visualization and analysis.
 * Dan Motzenbecker <dan@oxism.com>
 * MIT Licensed
 */

"use strict";

var fs    = require('fs'),
    path  = require('path'),
    async = require('async'),
    scan;

module.exports = scan = function(dir, cb, tree) {
  var baseName = path.basename(dir);

  tree = tree || {};
  tree[baseName] = {};

  fs.stat(dir, function(err, stats) {
    if (err) return cb(err);
    tree[baseName].stats = stats;

    if (stats.isDirectory()) {
      fs.readdir(dir, function(err, files) {
        if (err) return cb(err);
        if (files.length) {
          tree[baseName].sum      = 0;
          tree[baseName].children = {};
          async.each(files, function(file, cb) {
            scan(path.join(dir, file), function(err, branch) {
              if (err) return cb(err);
              tree[baseName].sum += branch[file].sum || branch[file].stats.size;
              cb();
            }, tree[baseName].children);
          }, function(err) {
            cb(err, tree)
          });
        } else {
          cb(null, tree);
        }
      });
    } else {
      cb(null, tree);
    }
  });
}

if (!module.parent) {
  if (process.argv[2]) {
    process.chdir(process.argv[2]);
  }
  scan(process.cwd(), function(err, stats) {
    console.log(JSON.stringify(stats, null, 2));
  });
}

