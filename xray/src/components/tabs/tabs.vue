<template>
  <div class="tabs">
    <ul class="tabs-list">
      <li v-for="tab in tabs" :class="{ 'tabs-tab--active': tab.active, 'tabs-tab': true }" :key="tab.name" @click="setActiveTab(tab)">{{tab.name}}</li>
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
    unregisterTab (tab) {
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
  },
  beforeMount () {
    // console.log('tabs before mount')
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  .tabs-list {
    padding: 0 0 1px 0;
    border-bottom: 1px solid #666;

    &:after {
      content: "";
      display: table;
      clear: both;
    }

    .tabs-tab {
      background-color: #666;
      color: #eee;
      display: block;
      float: left;
      margin: 0 10px 0 0;
      padding: 4px 20px;
      cursor: pointer;
      
      &--active {
        background-color: #999;
        color: #fff;
      }
    }
  }
}
</style>
