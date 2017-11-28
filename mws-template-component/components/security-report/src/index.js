import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
// require sub MWS component modules here

Vue.use(VueCustomElement)

export default {
  install () {
    // install sub MWS component modules here

    require('./ce/security-report')
    require('./ce/security-report-sa')
  }
}
