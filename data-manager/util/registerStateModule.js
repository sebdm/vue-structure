export const registerStateModule = (moduleName, store, instanceModule) => {
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
};
