import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

import Preview from './components/Previews.vue'
import Article from './components/Article.vue'

const routes = [
  { path: '/', component: Preview },
  { path: '/article/:name', component: Article}
]
  
const router = new VueRouter({
  routes // short for `routes: routes`
})

export default router