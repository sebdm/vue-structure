<template>
  <xray :instance-id="fullId()" :model="model" @update:holdings="setHoldings" />
</template>

<script>
import { SmartComponent } from 'component-mixins'
import Xray from './xray'

export default {
  name: 'xray-sa',
  mixins: [SmartComponent],
  props: {
    stateRegistry: {
      required: false,
      default: 'xray',
      type: String
    }
  },
  methods: {
    setHoldings (holdings) {
      this.dispatchNamespace('setHoldings', {
        holdings
      })
    }
  },
  data () {
    return {
      stateGetter: 'xrayData'
    }
  },
  components: {
    Xray
  },
  created () {}
}
</script>

<style>

</style>
