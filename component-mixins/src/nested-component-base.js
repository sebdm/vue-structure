import { ComponentBase } from './component-base'

export const NestedComponentBase = {
  mixins: [ComponentBase],
  props: {
    model: {
      required: true
    }
  }
}
