const fs = require("fs");
const path = require("path");
// const babel = require('babel-core')
// const babelPluginTransformRelativePaths = require('babel-plugin-transform-relative-paths')
const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);

  const dir = this.context;
  const fullFileName = this.resourcePath.substr(
    this.resourcePath.lastIndexOf(path.sep) + 1
  );
  const fileName = fullFileName.split(".")[0];
  const ceFilePath = `${dir}${path.sep}${fileName}-ce.js`;

  if (/export default\s*\{/.test(source)) {
    source = source.replace(/export default\s*\{/, 'const Component = {')
    source = source + `
export default Component`
  }

  const code = `
if (Component) {
  let Vue = require('vue').default
  let name = Component.name + '-ce'

  if (window.customElements && !window.customElements.get(name)) {
    console.log('dynamically defining custom element')
    Vue.customElement(name, Component)
  }
}
  `;

  return source + code;
};
