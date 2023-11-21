<template>
  <div>
    <v-card class="mx-auto" max-width="600">
      <v-list>
        <v-list-item v-for="(city, index) in cities" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ city.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="!city.editingPopulation"
              >Population: {{ city.population }}</v-list-item-subtitle
            >
            <v-text-field
              v-else
              v-model="city.editedPopulation"
              @blur="savePopulation(city)"
            ></v-text-field>
          </v-list-item-content>
          <template v-slot:append>
            <v-btn color="blue" icon="mdi-information" variant="text">
              <v-icon @click="editPopulation(city)">{{
                city.editingPopulation ? 'mdi-check' : 'mdi-pencil'
              }}</v-icon>
            </v-btn>
            <v-btn color="red" icon="mdi-information" variant="text">
              <v-icon @click="deleteCity(city)">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CitiesList',

  props: {
    receivedCities: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    cities: [],
  }),

  mounted() {
    this.fetchData();
  },

  watch: {
    receivedCities: {
      handler() {
        this.generateCitiesList(this.receivedCities);
      },
      deep: true,
    },
  },

  methods: {
    generateCitiesList(data) {
      this.cities = [];

      data.forEach((city) => {
        this.cities.push({
          ...city,
          editingPopulation: false,
          editedPopulation: '',
        });
      });
    },

    fetchData() {
      fetch('/api')
        .then((response) => response.json())
        .then((data) => {
          this.generateCitiesList(data);
        });
    },

    editPopulation(city) {
      city.editingPopulation = !city.editingPopulation;
      if (city.editingPopulation) {
        city.editedPopulation = city.population;
      }
    },
    savePopulation(city) {
      city.editingPopulation = false;
      city.population = city.editedPopulation;

      fetch(`/api`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: city.id,
          population: city.population,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.generateCitiesList(data);
        });
    },

    deleteCity(city) {
      fetch(`/api`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: city.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.generateCitiesList(data);
        });
    },
  },
};
</script>
