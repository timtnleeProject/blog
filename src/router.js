import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

import Home from './views/Home.vue'
// lazy load
const Article = () => import('./views/Article.vue')
const Search = () => import('./views/Search.vue')
const About = () => import('./views/About.vue')

const routes = [
  { path: '/', component: Home, meta:{title: 'Home'} },
  { path: '/article/:name', component: Article, meta:{title: 'Article'}},
  { path: '/search', component: Search, meta:{title: 'Articles'} },
  { path: '/about', component: About, meta:{title: 'About'}}
]
  
const router = new VueRouter({
  routes, // short for `routes: routes`
  scrollBehavior () {
    return { x:0, y:0}
  }
})

router.beforeEach((to, _from, next) => {
  document.title = `Timtnlee's Blog - ${to.meta.title}`
  next()
})

export default router