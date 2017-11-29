"use strict";
const path = require("path");
const fs = require("fs");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (options = {}) => {
  const config = require("../config")(options);
  let _exports = {};

  _exports.nonVendorModulePatterns = [/mws-vue/, /mws-v-/]
  
  _exports.isNonVendorModule = function(module) {
    var hasMatch = false
    this.nonVendorModulePatterns.forEach(pattern => {
      if (pattern.test(module.resource)) {
        hasMatch = true
      }
    })
  
    return hasMatch
  }

  _exports.getCwdName = function() {
    return options.cwd.split(path.sep)[
      options.cwd.split(path.sep).length - 1
    ];
  };

  _exports.getCwdPrefixedName = function() {
    return ["mws", this.getCwdName()].join("-");
  };

  _exports.pkg = function() {
    return JSON.parse(
      fs.readFileSync(path.join(options.cwd, "package.json"))
    );
  };

  _exports.assetsPath = function(_path) {
    const assetsSubDirectory =
      process.env.NODE_ENV === "production"
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
  };

  _exports.cssLoaders = function(options) {
    options = options || {};

    const cssLoader = {
      loader: "css-loader",
      options: {
        minimize: process.env.NODE_ENV === "production",
        sourceMap: options.sourceMap
      }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
      const loaders = [cssLoader];
      if (loader) {
        loaders.push({
          loader: loader + "-loader",
          options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
          })
        });
      }

      // Extract CSS when that option is specified
      // (which is the case during production build)
      if (options.extract) {
        return ExtractTextPlugin.extract({
          use: loaders,
          fallback: "vue-style-loader"
        });
      } else {
        return ["vue-style-loader"].concat(loaders);
      }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders("less"),
      sass: generateLoaders("sass", { indentedSyntax: true }),
      scss: generateLoaders("sass"),
      stylus: generateLoaders("stylus"),
      styl: generateLoaders("stylus")
    };
  };

  // Generate loaders for standalone style files (outside of .vue)
  _exports.styleLoaders = function(options) {
    const output = [];
    const loaders = _exports.cssLoaders(options);
    for (const extension in loaders) {
      const loader = loaders[extension];
      output.push({
        test: new RegExp("\\." + extension + "$"),
        use: loader
      });
    }
    return output;
  };

  return _exports;
};
