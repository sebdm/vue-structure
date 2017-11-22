import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'

Vue.use(VueCustomElement)

function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('@/components/', true, /\.vue$/))
