import Vue from 'vue'
import Vuex from 'vuex'
import { init, registerXrayModule } from 'mws-vuex-data-manager'
import EditHoldings from '../src/index'

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

EditHoldings.install()

const holdings = [
  { name: 'Holding 1', weight: 40 },
  { name: 'Holding 2', weight: 30 },
  { name: 'Holding 3', weight: 30 }
]

Vue.config.productionTip = false

document.querySelector('[instance-id=editHoldingsInstance1]').setAttribute('holdings', JSON.stringify(holdings))

/* eslint-disable no-new */
// new Vue({
//   el: '#preview',
//   template: `<mws-v-xray-sa instance-id="xrayInstance1" state-namespace="xray1" />`
// })
