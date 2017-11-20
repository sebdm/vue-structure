<template>
  <edit-holdings :instance-id="fullId()" :model="model" @update:holdings="setHoldings" />
</template>

<script>
import { SmartComponent } from 'component-mixins'
import EditHoldings from './edit-holdings'

export default {
  name: 'edit-holdings-sa',
  mixins: [SmartComponent],
  methods: {
    setHoldings (holdings) {
      this.dispatchNamespace('setHoldings', {
        holdings
      })
    }
  },
  data () {
    return {
      stateGetter: 'holdings'
    }
  },
  components: {
    EditHoldings
  }
}
</script>

<style>

</style>
