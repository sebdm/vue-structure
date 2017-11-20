import { ComponentBase } from './component-base'

export const DumbComponent = {
  mixins: [ComponentBase],
  props: {
    model: {
      required: true
    }
  },
  computed: {
    modelParsed() {
      return this.model && typeof this.model === 'string' ? JSON.parse(this.model) : this.model
    }
  }
}
