<template>
  <div id="app">
    <tabs>
      <tab :initial-active="true" name="Standalone Xray (1)">
        <xray-sa instance-id="xray1" state-registry="xray" state-namespace="xray1" state-getter="xrayData" />
      </tab>
      <tab name="Standalone Edit Holdings">
        <edit-holdings-sa instance-id="editHoldings1" state-registry="xray" state-namespace="xray1" state-getter="holdings" />
      </tab>
      <tab name="Standalone Xray (2)">
        <xray-sa instance-id="xray2" state-registry="xray" state-namespace="xray2" state-getter="xrayData" />
      </tab>
    </tabs>
  </div>
</template>

<script>
import XraySa from '@/components/xray/xray-sa'
import EditHoldingsSa from '@/components/edit-holdings/edit-holdings-sa'
import Tabs from '@/components/tabs/tabs'
import Tab from '@/components/tabs/tab'

export default {
  name: 'app',
  components: {
    XraySa,
    EditHoldingsSa,
    Tabs,
    Tab
  },
  data () {
    return {
      tabs: []
    }
  },
  methods: {
    randomizeTabs () {
      this.tabs = []
      for (let i = 0; i < Math.random() * 10; i++) {
        this.tabs.push(i + 1)
      }
    }
  },
  created () {
    this.randomizeTabs()
    this.interval = setInterval(() => {
      this.randomizeTabs()
    }, 5000)
  },
  destroyed () {
    clearInterval(this.interval)
  },
  mounted () {
    this.$store.dispatch('xray1/setHoldings', {
      holdings: [
        { name: 'Holding 1' },
        { name: 'Holding 2' },
        { name: 'Holding 3' }
      ]
    })
    this.$store.dispatch('xray2/setHoldings', {
      holdings: [
        { name: 'Holding 3' },
        { name: 'Holding 2' },
        { name: 'Holding 1' }
      ]
    })
  }
}
</script>

<style lang="scss">
#app {
  width: 60em;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  border: 1px solid #666;
  padding: 10px 20px 20px;
}

.body > div {
  width: 75em;
  display: inline-block;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter {
  transform: translateX(100px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
