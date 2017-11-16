import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

export default {
  namespaced: true,
  actions,
  getters,
  mutations: mutations,
  state: () => {
    return {
      xrayData: {},
      holdings: [{}, {}, {}],
      dataConfig: {}
    }
  }
}
