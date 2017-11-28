const fs = require('fs')
const rimraf = require('rimraf')
const copy = require('copy-template-dir')
const path = require('path')
const linkSiblingDeps = require('npm-link-sibling-deps')
const shelljs = require('shelljs')
const build = require('./build/build')

module.exports = {
  bundle(package, options) {
    createBundleProject(package, options).then(() => {
      installDependencies(options)
      build({ cwd: path.join(options.cwd, options.name) })
    })
  }
}

function installDependencies(options) {
  if (options.linkSiblingsTopFolders && options.linkSiblingsTopFolders.length) {
    linkSiblingDeps({ startingDirectory: path.join(options.cwd, options.name), topFolders: options.linkSiblingsTopFolders, topFoldersRoot: options.cwd })
  } else {
    shelljs.cd(path.join(options.cwd, options.name))
    shelljs.exec(`npm install`)
    shelljs.cd(options.cwd)
  }
}

function createBundleProject(package, options) {
  rimraf.sync(options.name)

  options.requireDependenciesString = Object.keys(package.dependencies).map(key => {
    return `require('${key}').default.install()`
  }).join('\n')

  return new Promise((resolve, reject) => {
    copy(path.join(__dirname, 'template'), path.join(options.cwd, options.name), options, (err, createdFiles) => {
      if (err) {
        throw err
      }
  
      createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
      const packageJsonPath = path.join(options.cwd, options.name, 'package.json')
      var packageJson = require(packageJsonPath)
      for (let key in package.dependencies) {
        packageJson.dependencies[key] = package.dependencies[key]
      }
  
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      resolve()
    });
  })
}