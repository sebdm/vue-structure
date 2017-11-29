<template>
  <{{prefix}}-{{name}}-ce :instance-id="fullId()" :model="stringify(model)"></{{prefix}}-{{name}}-ce>
</template>

<script>
import { SmartComponent } from 'mws-vue-util'

export default {
  name: '{{prefix}}-{{name}}-sa',
  mixins: [SmartComponent],
  props: {
    model: {
      required: false,
      type: String
    }
  },
  data () {
    return {
      stateGetter: 'some getter defined in the store'
    }
  },
  watch: {
  },
  computed: {},
  methods: {
  },
  created () {},
  mounted () {}
}
</script>

<style>

</style>
