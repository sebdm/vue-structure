import { registerStateModule } from './util/register-state-module'

export const init = (Vue, Vuex, cb) => {
  Vue.use(Vuex)

  let store = new Vuex.Store()

  if (window) {
    window.mws = window.mws || {}
    window.mws.stores = window.mws.stores || {}
    window.mws.stores.vuex = store
  }

  if (cb) {
    cb(store)
  }

  return store
}

export const registerXrayModule = (store, options) => {
  registerStateModule('xray', store, require('./xray').default, options)
}
