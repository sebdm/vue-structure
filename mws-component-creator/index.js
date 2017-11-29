const fs = require('fs')
const copy = require('copy-template-dir')
const path = require('path')
const shelljs = require('shelljs')

module.exports = {
  create(options) {
    createComponent(options).then(() => {
      //installDependencies(options)
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

function createComponent(options) {
  if (fs.existsSync(path.join(options.cwd, options.name))) {
    throw new Error("Already exists.");
  }

  return new Promise((resolve, reject) => {
    // Copy template files
    copy(path.join(__dirname, 'templates', options.template), path.join(options.cwd, options.name), options, (err, createdFiles) => {
      if (err) {
        throw err
      }
  
      createdFiles.forEach(filePath => {
        //console.log(`Created ${filePath}`)
        var pattern = /((dumb)|(smart))([._\-a-zA-Z]*)$/
        if (pattern.test(filePath)){
          
          var newFilePath = filePath.replace(pattern, function(whole, placeholder) {
            switch (placeholder) {
              case 'dumb':
                return options.name + arguments[4]
              case 'smart':
                return options.name + '-sa' + arguments[4]
            }
          })
          fs.renameSync(filePath, newFilePath)
        }
      })

      resolve()
    });
  })
}