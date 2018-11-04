"use strict";
const fs = require("fs-extra");
const flattener = require("./flattener");
const path = require("path");
const pattern = /import.*?;/i;

module.exports = {
  process: function(source, searchPaths) {
    let contents = fs.readFileSync(source).toString();
    const sourceDirectory = path.dirname(source);

    while(contents.match(pattern)) {
      const matched = contents.match(pattern)[0];
      contents = flattener.flatten(searchPaths, sourceDirectory, contents, matched);
    };

    return contents;
  }
};