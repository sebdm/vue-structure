import Vue from 'vue'
import Xray from './xray'

// slind: this doesn't seem to set up bindings approriately
// Vue.customElement('xray-ce', () => new Promise(resolve => {
//   require(['./xray'], lazy => {
//     resolve(lazy.default)
//   })
// }))

Vue.customElement(`${Xray.name}-ce`, Xray)
