import Vue from 'vue'
import Vuex from 'vuex'
import { init, registerXrayModule } from 'mws-vuex-data-manager'
import Xray from '../src/index'

init(Vue, Vuex, store => {
  registerXrayModule(store, {
    namespaces: ['xray1']
    // namespaces: {
    //   xray1: {
    //     dataConfig: {
    //       api: 'https://bla',
    //       transforms: ['bluah']
    //     }
    //   }
    // }
  })
})

Xray.install()

const holdings = [
  { name: 'Holding 1', weight: 40 },
  { name: 'Holding 2', weight: 30 },
  { name: 'Holding 3', weight: 30 }
]
const config = {
  doStuff: true
}

Vue.config.productionTip = false

document.querySelector('[instance-id=xrayInstance1]').setAttribute('holdings', JSON.stringify(holdings))
document.querySelector('[instance-id=xrayInstance1]').setAttribute('config', JSON.stringify(config))

/* eslint-disable no-new */
// new Vue({
//   el: '#preview',
//   template: `<mws-v-xray-sa instance-id="xrayInstance1" state-namespace="xray1" />`
// })
