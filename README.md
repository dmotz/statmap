# statmap
#### Output recursive directory stats as JSON for visualization and analysis.
[Dan Motzenbecker](http://oxism.com), MIT License

[@dcmotz](http://twitter.com/dcmotz)


### Installation and Usage

**As a system executable:**

```
$ npm install -g statmap
```

When used as an executable, statmap returns JSON over stdout.

To map the current directory:

```
$ statmap > stats.json
```

Pass an optional second argument for a different directory:


```
$ statmap .. > parent.json
```

The JSON will contain a recursive representation of the directory and all
children. Each key is a file or directory name with a corresponding value
containing a `stats` object and a `children` object if it is a directory.
Directories also are also given a `sum` property which reflects the size of
all children recursively, unlike the typical `size` property of directory's
`stats` object.

Here's an excerpt of the output for the package itself:

```javascript
{
  "statmap": {
    "stats": {
      "dev": 16777220,
      "mode": 16877,
      "nlink": 9,
      "uid": 501,
      "gid": 80,
      "rdev": 0,
      "blksize": 4096,
      "ino": 141035615,
      "size": 306,
      "blocks": 0,
      "atime": "2013-11-25T01:02:05.000Z",
      "mtime": "2013-11-25T01:02:05.000Z",
      "ctime": "2013-11-25T01:02:05.000Z"
    },
    "sum": 165329,
    "children": {
      "README.md": {
        "stats": {
          "dev": 16777220,
          "mode": 33188,
          "nlink": 1,
          "uid": 501,
          "gid": 80,
          "rdev": 0,
          "blksize": 4096,
          "ino": 141057002,
          "size": 550,
          "blocks": 8,
          "atime": "2013-11-25T01:02:05.000Z",
          "mtime": "2013-11-25T01:01:52.000Z",
          "ctime": "2013-11-25T01:01:54.000Z"
        }
      },
      "index.js": {
        "stats": {
          "dev": 16777220,
          "mode": 33188,
          "nlink": 1,
          "uid": 501,
          "gid": 80,
          "rdev": 0,
          "blksize": 4096,
          "ino": 141035626,
          "size": 1180,
          "blocks": 8,
          "atime": "2013-11-25T01:02:06.000Z",
          "mtime": "2013-11-25T00:51:31.000Z",
          "ctime": "2013-11-25T00:51:31.000Z"
        }
      },
      "node_modules": {
        "stats": {
          "dev": 16777220,
          "mode": 16877,
          "nlink": 3,
          "uid": 501,
          "gid": 20,
          "rdev": 0,
          "blksize": 4096,
          "ino": 141036545,
          "size": 102,
          "blocks": 0,
          "atime": "2013-11-25T00:53:55.000Z",
          "mtime": "2013-11-24T23:00:54.000Z",
          "ctime": "2013-11-24T23:00:54.000Z"
        },
        "children": {
          "async": {
            "stats": {
        //...
```

Using this data, you could create something like a
[D3 zoomable treemap](http://mbostock.github.io/d3/talk/20111018/treemap.html)
of your hard drive.


**As a library:**

```
$ npm install --save statmap
```

Pass a path and a callback:

```javascript
var statmap = require('statmap');

statmap('./spells', function(err, stats) {
  console.log(utils.inspect(stats, { color: true, depth: null }));
});

```

When used as a library, a live object is returned rather than a JSON string.

