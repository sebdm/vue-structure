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
        <tr v-for="holding in modelParsed" :key="holding.id">
          <td>{{ holding.name }}</td>
          <td>{{ holding.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { DumbComponent } from 'component-mixins'
export default {
  name: 'holdings',
  mixins: [DumbComponent],
  methods: {
  }
}
</script>

<style>

</style>
