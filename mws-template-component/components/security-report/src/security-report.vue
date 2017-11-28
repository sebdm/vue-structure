<template>
  <div class="security-report">
    <section>
      <h1>Security Report</h1>
      <div class="content">
        Model:
        <pre>{{ model }}</pre>
      </div>
    </section>
  </div>
</template>

<script>
import { DumbComponent } from 'mws-vue-util'

export default {
  name: 'mws-v-security-report',
  mixins: [DumbComponent],
  props: {},
  methods: {
    setHoldings (event) {
      this.$emit('update:holdings', event.detail[0])
    }
  },
  computed: {},
  components: {},
  created () {},
  mounted () {}
}
</script>

<style>

</style>
