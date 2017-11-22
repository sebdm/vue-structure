export const ComponentBase = {
  props: {
    instanceId: {
      type: String
      // required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    fullId (instanceId) {
      return !instanceId ? this.instanceId : `${this.instanceId}.${instanceId}`
    },
    stringify (obj) {
      return obj ? JSON.stringify(obj) : ''
    }
  }
}
