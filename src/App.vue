<template>
  <div id="app">
    <my-header></my-header>
    <div class="container">
      <router-view class="content"></router-view>
      <my-sidebar class="sidebar"></my-sidebar>
    </div> 
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './components/Header.vue'
import MySidebar from './components/Sidebar.vue'
import MyFooter from './components/Footer.vue'
import { mapState } from "vuex";

export default {
  name: 'app',
  components: {
    MyHeader,
    MyFooter,
    MySidebar
  },
  created(){
    window.console.log('Get articles\' previews')
    const setSettings = this.$get('./setting.js').then(res=>{
      this.$store.commit('setSettings', new Function(res)())
    })
    const setLists = this.$get('./list.json').then(res=>{
      this.$store.commit('setLists', JSON.parse(res))
    })
    Promise.all([setSettings, setLists]).then(()=>{
      const articles = []
      for(let name in this.lists.articles) {
        articles.push(name)
      }
      this.$getArticles(articles).then(raws=>{
        this.$store.commit('setPreviews',raws.slice(0,this.settings.HOME_MAX_PREVIEW).map(r=>{
          return {
            name: r.name,
            content: this.$markdown.render(r.content.split('\n').slice(0,this.settings.PREVIEW_LINE).join('\n'))
          }
        }))
      })
    })
  },
  computed: mapState({
    settings: 'settings',
    lists: 'lists'
  })
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px 20px 20px 10px;
  font-size: 14px;
}
.block {
  border: 1px solid gray;
  position: relative;
}
.block>.inner-block {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.container {
  
}
.container>.content{
  
}
.container>.sidebar{
  
}
</style>
