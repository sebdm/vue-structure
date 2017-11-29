import Vue from 'vue'
import Vuex from 'vuex'
import Component from '../src/index'

Component.install()

const model = {
  property1: "This is the data of property1"
}

Vue.config.productionTip = false

document.querySelector('[instance-id=instance1]').setAttribute('model', JSON.stringify(model))