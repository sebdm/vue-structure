<template>
  <div class="tabs">
    <ul>
      <li v-for="tab in tabs" :class="{ active: tab.active, 'tabs-tab': true }" :key="tab.name" @click="setActiveTab(tab)">{{tab.name}}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  data: () => {
    return {
      tabs: []
    }
  },
  mixins: [],
  computed: {},
  methods: {
    registerTab (tab) {
      this.tabs.push(tab)
    },
    unregisterTab (tabName) {
      var tab = this.tabs.find(t => t.name === tabName)
      this.tabs.splice(this.tabs.indexOf(tab), 1)
      if (tab.active) {
        this.tabs.forEach(tab => {
          tab.setActive(tab.initialActive || false)
        })
      }
    },
    setActiveTab (tab) {
      this.tabs.forEach(tab => {
        tab.setActive(false)
      })
      tab.setActive(true)
    }
  }
}
</script>

<style scoped>

</style>
