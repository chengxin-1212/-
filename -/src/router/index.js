import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/RenderEngine'},
  {
    path: '/RenderEngine',
    name: 'About',
    component: About,
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
