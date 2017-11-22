<template>
  <section>
    <h1 slot="title">{{ name }}</h1>
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'section',
  props: ['name'],
  data: () => {
    return {}
  },
  mixins: [],
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
