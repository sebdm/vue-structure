export const registerStateModule = (moduleName, store, instanceModule, options) => {
  let instances = [];

  store.registerModule(moduleName, {
    namespaced: true,
    state: () => {
      return {
        instances
      }
    },
    actions: {
      addInstance({ commit, state }, { namespace, initialState }) {
        if (state.instances.find(_namespace => _namespace === namespace)) {
          return;
        }

        commit("ADD_INSTANCE", { namespace, initialState });
      },
      removeInstance({ commit, state }, { namespace }) {
        if (!state.instances.find(_namespace => _namespace === namespace)) {
          return;
        }

        commit("REMOVE_INSTANCE", { namespace });
      }
    },
    mutations: {
      ADD_INSTANCE(state, { namespace, initialState }) {
        state.instances.push(namespace);
        store.registerModule(`${namespace}`, Object.assign({}, instanceModule, { state: Object.assign(instanceModule.state(), initialState) }));
      },
      REMOVE_INSTANCE(state, { namespace }) {
        state.instances.splice(state.instances.indexOf(namespace), 1);
        store.unregisterModule(`${namespace}`);
      }
    }
  });

  let namespaces = options && options.namespaces;
  if (namespaces && (namespaces.length || typeof namespaces === 'object')) {
    for (let key in namespaces) {
      let namespace = namespaces[key]
      let namespaceId
      if (typeof namespace === 'object') {
        namespaceId = key
      } else {
        namespaceId = namespace
      }
      store.dispatch(`${moduleName}/addInstance`, { namespace: namespaceId, initialState: namespace })
    }
  }
};
