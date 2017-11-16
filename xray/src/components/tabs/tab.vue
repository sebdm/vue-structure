<template>
  <div class="tab" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tab',
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
  mixins: [],
  methods: {
    setActive (trueFalse) {
      this.active = trueFalse
    }
  },
  components: {
  },
  created () {
    this.$parent.registerTab({ name: this.name, initialActive: this.initialActive, setActive: this.setActive, active: () => { return this.active } })
  },
  destroyed () {
    this.$parent.unregisterTab(this.name)
  }
}
</script>

<style scoped>

</style>
