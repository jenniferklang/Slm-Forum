<template>
  <main>
    <h1 class="text-h2 mb-12 text-center">Software Lifecycle Management</h1>
    <CitiesList :receivedCities="cities" class="mb-12" />
    <v-expansion-panels style="max-width: 600px" class="mx-auto">
      <v-expansion-panel>
        <v-expansion-panel-title>
          <h3 class="text-h5">Lägg till stad</h3>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <AddCityForm @city-added="onCityAdded" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </main>
</template>

<script>
import CitiesList from './components/CitiesList.vue';
import AddCityForm from './components/AddCityForm.vue';

export default {
  name: 'App',

  data: () => ({
    cities: [],
  }),

  watch: {
    cities: {
      handler() {
        console.log('cities changed');
        console.log(this.cities);
      },
      deep: true,
    },
  },

  methods: {
    onCityAdded(cities) {
      this.cities = cities;
    },
  },

  components: {
    CitiesList,
    AddCityForm,
  },
};
</script>
