import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./pages/LoginRegisterPage.vue'),
  },
  {
    path: '/about',
    component: () => import('./components/Text.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
