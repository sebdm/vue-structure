#!/usr/bin/env node --harmony

const args = require('args')
const shelljs = require("shelljs");
const path = require("path");
const fs = require("fs");
const rimraf = require('rimraf')

args.option('top-folders', 'The top folders containing siblings', '..', content => {
  return content ? content.split(';') : content
})
const flags = args.parse(process.argv)

const startingDirectory = process.cwd()
const startingInSibling = fs.existsSync(path.join(process.cwd(), "package.json"))
const startingInName = !startingInSibling ? null : JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"))).name
const topDirectories = flags.topFolders.map(d => path.join(startingDirectory, d))

const packages = {}
const hasLinked = {}

topDirectories.forEach(topDirectory => {
  fs
  .readdirSync(topDirectory)
  .filter(file => fs.statSync(path.join(topDirectory, file)).isDirectory())
  .filter(file => {
    return fs.existsSync(path.join(topDirectory, file, "package.json"));
  })
  .map(file => {
    let packageJson = JSON.parse(fs.readFileSync(path.join(topDirectory, file, "package.json")))
    let name = packageJson.name
    return {
      name,
      path: path.join(topDirectory, file),
      siblingDeps: [],
      packageJson
    };
  })
  .reduce((o, package) => {
    return Object.assign(o, { [package.name]: package })
  }, packages);
})

linkPackage(packages[startingInName])

// returns true if the package was linked, false otherwise
function linkPackage(package, dependenciesOrigin = {}) {
  if (hasLinked[package.name]) {
    return false
  }

  hasLinked[package.name] = true

  const deps = package.packageJson.dependencies
  const devDeps = package.packageJson.devDependencies

  if (!dependenciesOrigin[package.name]) {
    dependenciesOrigin[package.name] = { full: package.path, modulePath: package.path, module: package.name }
  }

  const ownDependenciesOrigin = getDependenciesOriginPathMap(package.path, package.packageJson.dependencies, packages)
  Object.assign(ownDependenciesOrigin, getDependenciesOriginPathMap(package.path, package.packageJson.devDependencies, packages))

  for (let key in ownDependenciesOrigin) {
    if (dependenciesOrigin[key]) {
      ownDependenciesOrigin[key] = dependenciesOrigin[key]
    } else {
      dependenciesOrigin[key] = ownDependenciesOrigin[key]
    }
  }

  dependenciesOrigin = Object.assign({}, dependenciesOrigin)
  
  if (deps) {
    for (let key in deps) {
      if (packages[key]) {
        linkPackage(packages[key], dependenciesOrigin)
        if (package.siblingDeps.indexOf(key) < 0) {
          package.siblingDeps.push(key)
        }
      }
    }
  }

  if (devDeps) {
    for (let key in devDeps) {
      if (packages[key]) {
        linkPackage(packages[key], dependenciesOrigin)
        if (package.siblingDeps.indexOf(key) < 0) {
          package.siblingDeps.push(key)
        }
      }
    }
  }

  shelljs.exec(`npm install`)

  for (var key in ownDependenciesOrigin) {
    var dep = ownDependenciesOrigin[key]
    if (dep.modulePath !== package.path) {
      const p = path.join(package.path, 'node_modules', dep.module)
      rimraf.sync(p)
      fs.symlinkSync(dep.full, p, 'dir')

      console.log('===============================================================================')
      console.log(`from: ${p}`)
      console.log(`target: ${dep.full}`)
    }
  }

  return true
}

function getDependenciesOriginPathMap(originPath, deps, packages) {
  const result = {}
  for (let key in deps) {
    if (packages[key]) {
      result[key] = { full: packages[key].path, modulePath: packages[key].path, module: key }
    } else {
      result[key] = { full: path.join(originPath, 'node_modules', key), modulePath: originPath, module: key }
    }
  }

  return result
}