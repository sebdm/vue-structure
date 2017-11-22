<template>
  <div class="xray">
    <section>
      <h1>Xray</h1>
      <div class="content">
        <tabs>
          <tab :initial-active="true" name="Edit holdings">
            <edit-holdings-ce :model="stringify(modelParsed.holdings)" :instance-id="fullId('editHoldings')" @update:holdings="setHoldings" />
          </tab>
          <tab name="Holdings">
            <holdings-ce :model="stringify(modelParsed.holdings)" :instance-id="fullId('holdings')" />
          </tab>
        </tabs>
      </div>
    </section>
  </div>
</template>

<script>
// wrap-in-ce

import { DumbComponent } from 'component-mixins'
import Tabs from '@/components/tabs/tabs'
import Tab from '@/components/tabs/tab'

const Component = {
  name: 'xray',
  mixins: [DumbComponent],
  methods: {
    setHoldings (event) {
      this.$emit('update:holdings', event.detail[0])
    }
  },
  computed: {

  },
  components: {
    Tabs,
    Tab
  }
}

export default Component
</script>

<style>

</style>
