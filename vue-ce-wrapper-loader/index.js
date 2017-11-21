const fs = require("fs");
const path = require("path");
// const babel = require('babel-core')
// const babelPluginTransformRelativePaths = require('babel-plugin-transform-relative-paths')
const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);

  if (/export default\s*\{/.test(source)) {
    source = source.replace(/export default\s*\{/, 'const Component = {')
    source = source + `
export default Component`
  }

  const code = `
if (Component) {
  const Vue = require('vue').default
  const name = Component.name + '-ce'

  if (window.customElements && !window.customElements.get(name)) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dynamically adding custom element:', name)
    }

    Vue.customElement(name, Component)
  }
}
  `;

  return source + code;
};
