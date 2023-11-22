<template>
  <main class="min-h-[100vh] flex flex-col justify-between">
    <div>
      <Navbar />
      <div class="mx-auto max-w-[70%]">
        <router-view class="py-12"></router-view>
      </div>
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
