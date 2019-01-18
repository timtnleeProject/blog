import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Search from './views/Search.vue'
import About from './views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/article/:name', component: Article},
  { path: '/search', component: Search },
  { path: '/about', component: About}
]
  
const router = new VueRouter({
  routes, // short for `routes: routes`
  scrollBehavior () {
    return { x:0, y:0}
  }
})

export default router