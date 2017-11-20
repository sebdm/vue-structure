import { ComponentBase } from './component-base'

export const DumbComponent = {
  mixins: [ComponentBase],
  props: {
    model: {
      required: true
    }
  }
}
