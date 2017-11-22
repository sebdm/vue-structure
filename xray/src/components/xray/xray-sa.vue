<template>
  <mws-xray-ce :instance-id="fullId()" :model="stringify(model)" @update:holdings="setHoldings" />
</template>

<script>
import { SmartComponent } from 'component-mixins'
import './xray'

export default {
  name: 'mws-xray-sa',
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
  computed: {},
  methods: {
    setHoldings (event) {
      this.dispatchNamespace('setHoldings', {
        holdings: event.detail[0]
      })
    }
  },
  created () {},
  mounted () {}
}
</script>

<style>

</style>
