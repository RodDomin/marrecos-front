import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '../views/Home.vue';
// import User from '../components/User.vue';
import store from '../store';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/dash/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dash/creditos',
    name: 'Créditos',
    component: () => import('../views/Credits.vue'),
  },
  {
    path: '/dash/usuario',
    name: 'Usuário',
    component: () => import('../views/User.vue'),
  },
  {
    path: '/dash/minhas-apostas',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/dash/apostas',
    name: 'Apostas',
    component: () => import('../views/Bets.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      allowAnonymous: true,
    },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Registro',
    meta: {
      allowAnonymous: true,
    },
    component: () => import('../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  if (!to.meta.allowAnonymous && !store.state.auth.data) {
    return next('/login');
  }

  return next();
});

export default router;
