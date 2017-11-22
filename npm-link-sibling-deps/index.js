#!/usr/bin/env node --harmony

const shelljs = require("shelljs");
const path = require("path");
const fs = require("fs");

const startingDirectory = process.cwd()

// create the packages object
const packages = fs
  .readdirSync(process.cwd())
  .filter(file => fs.statSync(path.join(process.cwd(), file)).isDirectory())
  .filter(file => {
    return fs.existsSync(path.join(process.cwd(), file, "package.json"));
  })
  .map(file => {
    return {
      name: file,
      path: path.join(process.cwd(), file),
      siblingDeps: [],
      packageJson: JSON.parse(
        fs.readFileSync(path.join(process.cwd(), file, "package.json"))
      )
    };
  })
  .reduce((o, package) => {
    return Object.assign(o, { [package.name]: package })
  }, {});

// iterate packages and run npm link for each, plus map sibling deps
for (let name in packages) {
  const package = packages[name]
  const deps = package.packageJson.dependencies
  const devDeps = package.packageJson.devDependencies
  if (deps) {
    for (let key in deps) {
      if (packages[key]) {
        package.siblingDeps.push(key)
      }
    }
  }

  if (devDeps) {
    for (let key in devDeps) {
      if (packages[key]) {
        package.siblingDeps.push(key)
      }
    }
  }

  shelljs.cd(package.path)
  shelljs.exec(`npm link`)
  shelljs.cd(startingDirectory)

  // console.log(package.name, package.siblingDeps)
}

// iterate packages and run npm link $siblingDep for each sibling dep
for (let name in packages) {
  const package = packages[name]
  shelljs.cd(package.path)
  package.siblingDeps.forEach(dep => {
    shelljs.exec(`npm link ${dep}`)
    console.log(`linking ${dep} for ${package.name}`)
  })

  shelljs.cd(startingDirectory)
}