<template>
  <xray :instance-id="fullId()" :model="model" @update:holdings="setHoldings" />
</template>

<script>
import { StandaloneComponentBase } from 'component-mixins'
import Xray from './xray'

export default {
  name: 'xray-sa',
  mixins: [StandaloneComponentBase],
  methods: {
    setHoldings (holdings) {
      this.dispatchNamespace('setHoldings', {
        holdings
      })
    }
  },
  components: {
    Xray
  },
  created () {

  }
}
</script>

<style>

</style>
