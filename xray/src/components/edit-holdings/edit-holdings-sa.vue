<template>
  <edit-holdings-ce :instance-id="fullId()" :model="stringify(model)" @update:holdings="setHoldings" />
</template>

<script>
import { SmartComponent } from 'component-mixins'
import EditHoldings from './edit-holdings'

export default {
  name: 'edit-holdings-sa',
  mixins: [SmartComponent],
  methods: {
    setHoldings (event) {
      this.dispatchNamespace('setHoldings', {
        holdings: event.detail[0]
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
