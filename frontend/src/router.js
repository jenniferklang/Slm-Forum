import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

const routes = [
  {
    path: '/test',
    component: () => import('./components/Test.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    component: () => import('./pages/ForumPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('./pages/LoginRegisterPage.vue'),
  },
  {
    path: '/user',
    component: () => import('./pages/UserSettings.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/policy',
    component: () => import('./pages/PrivacyPolicy.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/posttopic',
    component: () => import('./pages/PostTopic.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/forum',
    component: () => import('./pages/ForumPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/followthread/:topicId',
    name: 'followThread',
    component: () => import('./pages/FollowThread.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/chat',
    component: () => import('./pages/Chat.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/posttopic',
    component: () => import('./pages/PostTopic.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const isTokenValid = await checkToken();
    if (isTokenValid) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

async function checkToken() {
  try {
    const response = await axios.get('/api/auth/validate');
    sessionStorage.setItem('user_id', response.data.userId);
    return response.data.valid;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default router;
