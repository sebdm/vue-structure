<template>
  <div class="xray">
    <section>
      <h1>This is {{ instanceId }}</h1>
      <div class="content">
        <edit-holdings :model="modelParsed.holdings" :instance-id="fullId('editHoldings')" @update:holdings="setHoldings" />
        <holdings :model="modelParsed.holdings" :instance-id="fullId('holdings')" />
      </div>
    </section>
  </div>
</template>

<script>
import { DumbComponent } from 'component-mixins'
import EditHoldings from '../edit-holdings/edit-holdings'
import Holdings from '../holdings/holdings'

const Component = {
  name: 'xray',
  mixins: [DumbComponent],
  methods: {
    setHoldings (holdings) {
      this.$emit('update:holdings', holdings)
    }
  },
  computed: {

  },
  components: {
    EditHoldings,
    Holdings
  }
}

export default Component
</script>

<style>

</style>
