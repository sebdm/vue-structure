#!/usr/bin/env node --harmony

const creator = require('..')
creator.create({
  name: 'my-component',
  description: 'My new component',
  //  linkSiblingsTopFolders: ['.', './mws-template-component/components'],
  cwd: process.cwd(),
  prefix: "mws-v",
  template: "template",
  author: "",
  authorEmail: ""
})
