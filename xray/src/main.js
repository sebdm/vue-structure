// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './ce'
import Vue from 'vue'
import Vuex from 'vuex'
import XrayApp from './XrayApp'
import { registerXrayModule } from 'data-manager'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

  }
})

registerXrayModule(store, {
  namespaces: ['xray1', 'xray2']
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<XrayApp />',
  components: { XrayApp }
})
