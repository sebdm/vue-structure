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
      addInstance({ commit, state }, { namespace }) {
        if (state.instances.find(_namespace => _namespace === namespace)) {
          return;
        }

        commit("ADD_INSTANCE", { namespace });
      },
      removeInstance({ commit, state }, { namespace }) {
        if (!state.instances.find(_namespace => _namespace === namespace)) {
          return;
        }

        commit("REMOVE_INSTANCE", { namespace });
      }
    },
    mutations: {
      ADD_INSTANCE(state, { namespace }) {
        state.instances.push(namespace);
        store.registerModule(`${namespace}`, instanceModule);
      },
      REMOVE_INSTANCE(state, { namespace }) {
        state.instances.splice(state.instances.indexOf(namespace), 1);
        store.unregisterModule(`${namespace}`);
      }
    }
  });

  let namespaces = options && options.namespaces;
  if (namespaces && namespaces.length) {
    namespaces.forEach(namespace => {
      store.dispatch(`${moduleName}/addInstance`, { namespace })
    })
  }
};
