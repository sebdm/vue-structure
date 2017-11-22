<template>
  <div class="tabs-content" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'mws-tab',
  props: {
    name: {
      required: true,
      type: String
    },
    initialActive: {
      type: Boolean
    }
  },
  data () {
    return {
      active: this.initialActive
    }
  },
  methods: {
    setActive (trueFalse) {
      this.active = trueFalse
    }
  },
  components: {},
  created () {
    this.$parent.registerTab(this)
  },
  destroyed () {
    this.$parent.unregisterTab(this)
  }
}
</script>

<style>

</style>
