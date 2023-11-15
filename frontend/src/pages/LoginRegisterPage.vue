<template>
  <div class="flex justify-center mih-h-[100vh] items-center">
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
