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
        <tr v-for="holding in modelParsed" :key="holding.id">
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
    <button @click="setHoldings(modelParsed)">Update</button>
  </div>
</template>

<script>
import { DumbComponent } from 'component-mixins'

export default {
  name: 'edit-holdings',
  mixins: [DumbComponent],
  methods: {
    setHoldings (holdings) {
      this.$emit('update:holdings', holdings)
    },
    addHolding () {
      this.modelParsed.push({
        id: Math.random(),
        name: '',
        weight: null
      })
    },
    removeHolding (holding) {
      this.modelParsed.splice(this.modelParsed.indexOf(holding), 1)
    }
  }
}
</script>

<style>

</style>
