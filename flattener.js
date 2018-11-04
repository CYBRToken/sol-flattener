"use strict";
const pathUtility = require("./path-utility");
const fs = require("fs-extra");
const pino = require("pino");
const pattern = /pragma.*?;/i;

const logger = pino({
  prettyPrint: true
});

module.exports = {
  flatten: function(searchPaths, sourceDirectory, contents, statement) {
    const file = pathUtility.getPath(searchPaths, sourceDirectory, statement);
    if(!global.imports) {
      global.imports = [];
    };

    const contains = global.imports.indexOf(file) > 0;

    if(file && !contains) {
      logger.info("Importing ", file);

      global.imports.push(file);

      let temp = fs.readFileSync(file).toString();
      temp = temp.replace(pattern, "");

      contents = contents.replace(statement, temp);
    }

    if(contains) {
      contents = contents.replace(statement, "");
    }

    return contents;
  }
};