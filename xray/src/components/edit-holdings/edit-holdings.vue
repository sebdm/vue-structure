<template>
  <div class="edit-holdings">
    <table>
      <thead>
        <tr>
          <th>Holding name</th>
          <th>Weight %</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="holding in cloned" :key="holding.id">
          <td><input type="text" v-model="holding.name" /></td>
          <td><input type="number" v-model.number="holding.weight" /></td>
          <td><button @click="removeHolding(holding)">x</button></td>
        </tr>
        <tr>
          <td colspan="3">
            <button @click="addHolding()">Add holding</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="setHoldings(cloned)">Update</button>
  </div>
</template>

<script>
import { NestedComponentBase } from 'component-mixins'

export default {
  name: 'edit-holdings',
  mixins: [NestedComponentBase],
  data: () => {
    return {
      cloned: null
    }
  },
  watch: {
    model () {
      this.setCloned()
    }
  },
  methods: {
    setHoldings (holdings) {
      this.$emit('update:holdings', holdings)
    },
    addHolding () {
      this.cloned.push({
        id: Math.random(),
        name: '',
        weight: null
      })
    },
    removeHolding (holding) {
      this.cloned.splice(this.cloned.indexOf(holding), 1)
    },
    setCloned () {
      if (!this.model) {
        return
      }

      this.cloned = JSON.parse(JSON.stringify(this.model))
    }
  },
  created () {
    this.setCloned()
  }
}
</script>

<style>

</style>
