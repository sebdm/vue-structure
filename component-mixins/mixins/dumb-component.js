import { ComponentBase } from './component-base'

export const DumbComponent = {
  mixins: [ComponentBase],
  props: {
    model: {
      required: true
    }
  },
  computed: {
  },
  data() {
    return {
      modelParsed: null
    }
  },
  watch: {
    model: {
      handler (value) {
        this.modelParsed = value && typeof value === 'string' ? JSON.parse(value) : value
      },
      immediate: true
    }
  }
}
