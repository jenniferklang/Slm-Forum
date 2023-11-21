<template>
  <div>
    <v-card class="mx-auto" max-width="600">
      <v-sheet class="mx-auto pa-6">
        <v-form @submit.prevent>
          <v-text-field
            variant="solo"
            v-model="name"
            :rules="cityRules"
            validate-on="input"
            label="Stad"
          ></v-text-field>
          <v-text-field
            variant="solo"
            v-model="population"
            :rules="populationRules"
            validate-on="input"
            label="Population"
          ></v-text-field>

          <v-btn
            type="submit"
            block
            class="mt-2"
            color="green"
            @click="submitForm"
            >Lägg till</v-btn
          >
        </v-form>
      </v-sheet>
    </v-card>
    <v-overlay
      v-model="overlay"
      scrim="black"
      class="d-flex justify-center align-center"
    >
      <v-card class="mx-auto">
        <v-card-text class="text-center">
          <h2 class="text-h5">Staden finns redan i listan.</h2>
          <p>Testa att lägga till en annan!</p>
        </v-card-text>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddCityForm',

  emits: ['cityAdded'],

  data: () => ({
    name: '',
    population: '',
    overlay: false,

    populationRules: [
      (value) => {
        return value !== '' || 'Population måste anges';
      },

      (value) => {
        const parsedValue = parseInt(value, 10);
        return !isNaN(parsedValue) || 'Population måste vara ett nummer';
      },

      (value) => {
        const parsedValue = parseInt(value, 10);
        return parsedValue > 0 || 'Population måste vara större än 0';
      },
    ],

    timeout: null,
    cityRules: [
      (value) => {
        return value !== '' || 'Stad måste anges';
      },
    ],
  }),

  methods: {
    submitForm() {
      let requestData = {
        name: this.name,
        population: this.population,
      };

      axios
        .post('/api', requestData)
        .then((response) => {
          this.$emit('cityAdded', response.data);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 400) {
            this.overlay = true;
          }
        });
    },
  },
};
</script>

<style scoped>
.centered-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>
