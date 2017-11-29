<template>
  <div class="{{name}}">
    <section>
      <h1>{{name}}</h1>
      <div class="content">

      </div>
    </section>
  </div>
</template>

<script>
import { DumbComponent } from 'mws-vue-util'

export default {
  name: '{{prefix}}-{{name}}',
  mixins: [DumbComponent],
  props: {},
  methods: {
  },
  computed: {},
  components: {},
  created () {},
  mounted () {}
}
</script>

<style>

</style>
