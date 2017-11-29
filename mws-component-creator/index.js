const fs = require("fs");
const copy = require("copy-template-dir");
const path = require("path");
const shelljs = require("shelljs");
const chalk = require("chalk");
const linkSiblingDeps = require('npm-link-sibling-deps')

module.exports = {
  create(options) {
    if (checkExists(options)) {
      throw new Error(chalk.red("Already exists."));
    }

    createComponent(options).then(() => {
      console.log(chalk.green.bold(`Successfully created ${options.name}`))
    });
  }
};

function checkExists(options) {
  if (fs.existsSync(path.join(options.cwd, options.name))) {
    return true;
  }

  return false;
}

function createComponent(options) {
  return new Promise((resolve, reject) => {
    // Copy template files
    copy(
      path.join(__dirname, "templates", options.template),
      path.join(options.cwd, options.name),
      options,
      (err, createdFiles) => {
        if (err) {
          throw err;
        }

        console.log(
          chalk.green.bold(
            `Created ${createdFiles.length} files in ${options.name}`
          )
        );

        createdFiles.forEach(filePath => {
          var pattern = /((dumb)|(smart))([._\-a-zA-Z]*)$/;
          if (pattern.test(filePath)) {
            var newFilePath = filePath.replace(pattern, function(
              whole,
              placeholder
            ) {
              switch (placeholder) {
                case "dumb":
                  return options.name + arguments[4];
                case "smart":
                  return options.name + "-sa" + arguments[4];
              }
            });

            fs.renameSync(filePath, newFilePath);
          }
        });

        resolve();
      }
    );
  });
}
