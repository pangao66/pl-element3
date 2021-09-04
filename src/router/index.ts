import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('../views/button-demo.vue')
  },
  {
    path: '/input',
    name: 'input',
    component: () => import('../views/input-demo.vue')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../views/select-demo.vue')
  },
  {
    path: '/date',
    name: 'date',
    component: () => import('../views/date-demo.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('../views/form-demo.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
