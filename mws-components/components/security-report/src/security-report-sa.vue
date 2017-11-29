<template>
  <mws-v-security-report-ce :instance-id="fullId()" :model="stringify(model)" @update:holdings="setHoldings" />
</template>

<script>
import { SmartComponent } from 'mws-vue-util'

export default {
  name: 'mws-v-security-report-sa',
  mixins: [SmartComponent],
  props: {
    stateRegistry: {
      required: false,
      default: 'xray'
    },
    holdings: {
      required: false,
      type: String
    }
  },
  data () {
    return {
      stateGetter: 'xrayData'
    }
  },
  watch: {
    holdings: {
      handler: function (value) {
        if (value) {
          this.dispatchNamespace('setHoldings', { holdings: JSON.parse(value) })
        }
      },
      immediate: true
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
