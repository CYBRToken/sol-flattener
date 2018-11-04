#!/usr/bin/env node
"use strict";

const path = require("path");
const resolve = require("path").resolve;
const fs = require("fs-extra");
const processor = require("./processor");
const pino = require("pino");

const logger = pino({
  prettyPrint: true
});

function getConfig() {
  function readConfig() {
    const file = path.join(process.cwd(), "sol-flattener.json");

    if(!fs.pathExistsSync(file)) {
      return {};
    }

    const contents = fs.readFileSync(file);
    const config = JSON.parse(contents.toString());

    return config;
  };

  var config = readConfig();

  const args = process.argv;

  if(args.length > 6) {
    logger.error(`Invalid command ${process.argv.join(" ")}`);
    return;
  }

  if(args.length > 2) {
    config.source = args[2];
    config.destination = resolve(args[3]);
    config.search = args[4];
    config.removeRedundantEmptyLines = (args[5] || "").toLowerCase().startsWith("t");
  }

  if(config.source) {
    config.source = resolve(config.source);
    config.destination = resolve(config.destination);

    config.search = (config.search || "").split(",").map(function(item) {
      return item.trim();
    });
  }

  return config;
}

const config = getConfig();

if(!config.source) {
  logger.error("Invalid operation.");
  return;
}

let contents = processor.process(config.source, config.search);

if(config.removeRedundantEmptyLines) {
  contents = contents.replace(/\n\s*\n\s*\n/g, "\n\n");
}

fs.writeFileSync(config.destination, contents);