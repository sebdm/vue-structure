export const setHoldings = ({ commit, dispatch, state }, { holdings }) => {
  // todo: compare holdings to state.holdings prior to firing the commit to prevent unnecessary commits (floods the dev tools...)

  commit('SET_HOLDINGS', holdings)
  dispatch('loadData')
}

export const setDataConfig = ({ commit, dispatch, state }, { dataConfig }) => {
  // todo: compare dataConfig to state.dataConfig

  commit('SET_DATA_CONFIG', dataConfig)
}

export const loadData = ({commit, state}) => {
  // todo: sanity check for config and holdings, api call
  commit('SET_XRAY_DATA', {
    holdings: state.holdings,
    stockSectors: {
      something: 'something'
    }
  })
}
