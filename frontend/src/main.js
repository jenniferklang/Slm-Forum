import { createApp, watch } from "vue";
import { registerSW } from "virtual:pwa-register";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";
registerSW();

const pinia = createPinia();

watch(
  pinia.state,
  (state) => {
    console.log(state);
    if (state.activeUser) {
      localStorage.setItem("activeUser", JSON.stringify(state.activeUser));
    }
    localStorage.setItem("newMessages", JSON.stringify(state.newMessages));
  },
  { deep: true }
);

createApp(App).use(router).use(pinia).mount("#app");
