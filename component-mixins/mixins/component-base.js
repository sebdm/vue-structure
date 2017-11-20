export const ComponentBase = {
  props: {
    instanceId: {
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
    }
  }
}
