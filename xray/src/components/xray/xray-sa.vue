<template>
  <xray-ce :instance-id="fullId()" :model="modelStringified" @update:holdings="setHoldings" />
</template>

<script>
import { SmartComponent } from 'component-mixins'
import './xray-ce'

export default {
  name: 'xray-sa',
  mixins: [SmartComponent],
  props: {
    stateRegistry: {
      required: false,
      default: 'xray'
    }
  },
  data () {
    return {
      stateGetter: 'xrayData'
    }
  },
  computed: {
    modelStringified () {
      return JSON.stringify(this.model)
    }
  },
  methods: {
    setHoldings (event) {
      this.dispatchNamespace('setHoldings', {
        holdings: event.detail[0]
      })
    }
  }
}
</script>

<style>

</style>
