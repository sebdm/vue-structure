import { ComponentBase } from './component-base'

export const SmartComponent = {
  mixins: [ComponentBase],
  props: {
    stateRegistry: {
      required: true,
      type: String
    },
    stateNamespace: {
      required: true,
      type: String
    }
  },
  computed: {
    model () {
      return this.$store.getters[`${this.stateNamespace}/${this.stateGetter}`]
    }
  },
  methods: {
    ensureInstance () {
      this.dispatchRegistry('addInstance', { namespace: this.stateNamespace })
    },
    dispatchRegistry (actionName, payload) {
      this.$store.dispatch(`${this.stateRegistry}/${actionName}`, payload)
    },
    dispatchNamespace (actionName, payload) {
      this.$store.dispatch(`${this.stateNamespace}/${actionName}`, payload)
    }
  },
  watch: {
    stateNamespace: {
      handler () {
        this.ensureInstance()
      },
      immediate: true
    }
  },
  created () {
    if (this.dataConfig) {
      this.dispatchNamespace('setDataConfig', { dataConfig: this.dataConfig })
    }
  },
  beforeCreate() {
    if (!this.$store) {
      if (window && window.mws && window.mws.stores && window.mws.stores.vuex) {
        this.$store = window.mws.stores.vuex
      }
    }
  }
}
