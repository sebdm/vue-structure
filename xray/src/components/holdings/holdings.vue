<template>
  <div class="holdings">
    <table>
      <thead>
        <tr>
          <th>Holding name</th>
          <th>Weight %</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="holding in model" :key="holding.id">
          <td>{{ holding.name }}</td>
          <td>{{ holding.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { NestedComponentBase } from 'component-mixins'
export default {
  name: 'holdings',
  mixins: [NestedComponentBase],
  methods: {
  }
}
</script>

<style>

</style>
