"use strict";

var find = require("find");
const path = require("path");
const resolve = require("path").resolve;
const fs = require("fs-extra");

module.exports = {
  getPath: function(searchPaths, sourceDirectory, statement) {
    function searchRecursively(searchDirectory, fileName) {
      if(!fs.pathExistsSync(searchDirectory)) {
        return undefined;
      }

      const files = find.fileSync(fileName, searchDirectory);
      return files;
    };

    const importPath = statement.replace("import", "").replace(/"/g, "").replace(/'/g, "").replace(";", "").trim();

    for(let i in searchPaths) {
      const search = searchPaths[i];
      const searchDirectory = path.join(sourceDirectory, search);

      const file = path.join(sourceDirectory, search, importPath);

      if(fs.pathExistsSync(file)) {
        return resolve(file);
      }

      const fileName = path.basename(importPath);

      const result = searchRecursively(searchDirectory, fileName);

      if(result && result.length && result[0]) {
        return resolve(result[0]);
      }
    }

    return undefined;
  }
};