#!/usr/bin/env node --harmony

const bundler = require('..')
bundler.bundle({
  dependencies: {
    'mws-v-xray': '^1.0.0',
    'mws-v-security-report': '^1.0.0'
  }
}, {
  name: 'my-bundle',
  description: 'My bundle',
  linkSiblingsTopFolders: ['.', './mws-components/components'],
  cwd: process.cwd()
})
