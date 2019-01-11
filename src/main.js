import Vue from 'vue'
import App from './App.vue'
//plugins
import Constant from './constant'
//instances
import router from './router'
import store from './store/index'
//style
import './el.css'
Vue.config.productionTip = false

Vue.use(Constant)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
