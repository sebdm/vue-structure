#!/usr/bin/env node --harmony

const shelljs = require("shelljs");
const path = require("path");
const fs = require("fs");

const startingDirectory = process.cwd()
const startingInSibling = fs.existsSync(path.join(process.cwd(), "package.json"))
const startingInName = !startingInSibling ? null : JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"))).name
const topDirectory = startingInSibling ? path.join(startingDirectory, '..') : startingDirectory

// create the packages object
const packages = fs
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
  }, {});

for (let name in packages) {
  if (startingInSibling) {
    if (name === startingInName) {
      linkPackage(packages[name])
      break
    }
  } else {
    linkPackage(packages[name])
  }
}

function linkPackage(package) {
  const deps = package.packageJson.dependencies
  const devDeps = package.packageJson.devDependencies
  if (deps) {
    for (let key in deps) {
      if (packages[key]) {
        linkPackage(packages[key])
        package.siblingDeps.push(key)
      }
    }
  }

  if (devDeps) {
    for (let key in devDeps) {
      if (packages[key]) {
        linkPackage(packages[key])
        package.siblingDeps.push(key)
      }
    }
  }

  shelljs.cd(package.path)
  package.siblingDeps.forEach(dep => {
    shelljs.exec(`npm link ${dep}`)
    console.log(`linked ${dep} for ${package.name}`)
  })

  shelljs.exec(`npm link`)
  shelljs.cd(startingDirectory)
}
