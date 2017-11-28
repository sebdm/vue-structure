"use strict";
const path = require("path");

module.exports = (options = {}) => {
  const vueLoaderConfig = require("./vue-loader.conf")(options);
  const utils = require("./utils")(options);

  const config = require("../config")(options);

  function resolve(dir) {
    return path.join(options.cwd, dir);
  }

  return {
    entry: {

    },
    output: {
      path: config.build.assetsRoot,
      filename: "[name].js",
      publicPath:
        process.env.NODE_ENV === "production"
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath,
      library: "[name]",
      libraryTarget: "umd"
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        vue$: "vue/dist/vue.esm.js"
      },
      symlinks: true // important!
    },
    resolveLoader: {
      modules: [path.join(__dirname, '..', 'node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          enforce: "pre",
          include: [resolve("src"), resolve("test")],
          options: {
            fix: true,
            emitWarnings: true,
            failOnError: false,
            failOnWarning: false,
            formatter: require("eslint-friendly-formatter")
          }
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: vueLoaderConfig
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: [resolve("src"), resolve("test")].concat(
            utils.nonVendorModulePatterns
          )
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: utils.assetsPath("img/[name].[hash:7].[ext]")
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: utils.assetsPath("media/[name].[hash:7].[ext]")
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
          }
        }
      ]
    }
  };
};
