#!/usr/bin/env node --harmony

const args = require("args");
const path = require("path");
const linkSiblingDeps = require('..');

args.option(
  "top-folders",
  "The top folders containing siblings",
  "..",
  content => {
    return content ? content.split(";") : content;
  }
);
args.option(
  "starting-directory",
  "The starting directory",
  process.cwd()
)
args.option(
  "top-folders-root",
  "The root/starting point that top-folders are relative to",
  process.cwd()
)
const options = args.parse(process.argv);
linkSiblingDeps(options)
