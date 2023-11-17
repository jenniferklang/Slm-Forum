import { createApp, watch } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';
registerSW();

const pinia = createPinia();

watch(
  pinia.state,
  (state) => {
    localStorage.setItem('user', JSON.stringify(state.user));
  },
  { deep: true }
);

createApp(App).use(router).use(pinia).mount('#app');
