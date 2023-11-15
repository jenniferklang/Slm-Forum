<template>
  <div class="h-[100vh] flex justify-center items-center">
    <Card />
  </div>
</template>

<script>
import Card from '../components/LoginRegisterCard.vue';

export default {
  name: 'LoginRegisterPage',

  components: {
    Card,
  },
};
</script>
