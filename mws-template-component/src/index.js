import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
import Xray from '@/components/xray'
import XraySa from '@/components/xray-sa'
// todo: import sub MWS component modules here

Vue.use(VueCustomElement)

export default {
  install (Vue, options = { registerGlobally: false }) {
    // todo: Vue.use sub MWS component modules here

    require('@/components/ce/xray')
    require('@/components/ce/xray-sa')

    if (options.registerGlobally === true) {
      Vue.component(Xray.name, Xray)
      Vue.component(XraySa.name, XraySa)
    }
  },
  components: {
    Xray,
    XraySa
  }
}
