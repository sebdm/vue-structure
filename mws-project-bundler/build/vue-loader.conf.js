"use strict";
const isProduction = process.env.NODE_ENV === "production";

module.exports = (options = {}) => {
  const utils = require("./utils")(options);
  const config = require("../config")(options);

  return {
    loaders: utils.cssLoaders({
      sourceMap: isProduction
        ? config.build.productionSourceMap
        : config.dev.cssSourceMap,
      extract: isProduction
    }),
    transformToRequire: {
      video: "src",
      source: "src",
      img: "src",
      image: "xlink:href"
    }
  };
};
