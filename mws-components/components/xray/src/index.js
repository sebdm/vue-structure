import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
import EditHoldings from 'mws-v-edit-holdings'
// require sub MWS component modules here

Vue.use(VueCustomElement)

export default {
  install () {
    EditHoldings.install()
    // install sub MWS component modules here

    require('./ce/xray')
    require('./ce/xray-sa')
  }
}
