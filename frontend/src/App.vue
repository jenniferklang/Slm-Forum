<template>
  <main class="bg-base-100">
    <div class="bg-base-100 max-w-7xl mx-auto">
      <Navbar />
      <router-view class="my-12"></router-view>
    </div>
    <Footer class="" />
  </main>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'App',

  components: {
    Navbar,
    Footer,
  },
};
</script>
