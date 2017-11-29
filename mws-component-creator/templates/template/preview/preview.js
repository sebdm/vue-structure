import Vue from 'vue'
import Vuex from 'vuex'
//import { init, registerXrayModule } from 'mws-vuex-data-manager'
import Component from '../src/index'

// If you need data handling blah blah blah
/*
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
*/

Component.install()

const model = {
  property1: "This is the data of property1"
}

Vue.config.productionTip = false

document.querySelector('[instance-id=instance1]').setAttribute('model', JSON.stringify(model))