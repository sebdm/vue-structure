import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
// import sub MWS component modules here

Vue.use(VueCustomElement)

export default {
  install () {
    // install sub MWS component modules here

    require('./ce/{{name}}')
    require('./ce/{{name}}-sa')
  }
}
