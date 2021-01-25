import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/button',
    component: () => import('../views/button-demo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
