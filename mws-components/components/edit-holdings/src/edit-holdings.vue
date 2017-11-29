<template>
  <div class="edit-holdings">
    <section>
      <h1>Edit Holdings</h1>
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
  name: 'mws-v-edit-holdings',
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
