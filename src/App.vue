<template>
  <div id="app">
    <my-header class="my-header" @toggleBar="toggleSideBar"></my-header>
    <div class="container">
      <router-view class="content"></router-view>
      <my-footer></my-footer>
    </div>
    <div class="fixed-container" :class='{show:show}' @click="closeSideBar">
      <my-sidebar class="sidebar"></my-sidebar>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/Header.vue'
import MySidebar from './components/Sidebar.vue'
import MyFooter from './components/Footer.vue'
import { mapState } from "vuex";

export default {
  name: 'app',
  data: ()=>{
    return {
      show: false
    }
  },
  components: {
    MyHeader,
    MyFooter,
    MySidebar
  },
  created(){
    window.console.log('[Init] Get articles\' previews')
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
        this.$store.commit('setPreviews',raws.map(r=>{
          const content_ary = r.content.split('\n')
          return {
            name: r.name,
            content: this.$markdown.render(content_ary.slice(0,this.settings.PREVIEW_LINE).join('\n')),
            date: new Date(this.lists.articles[r.name].date),
            title: content_ary[0].slice(2,-1)
          }
        }))
      })
    })
  },
  computed: mapState({
    settings: 'settings',
    lists: 'lists'
  }),
  methods: {
    toggleSideBar(){
      this.show = !this.show
    },
    closeSideBar() {
      if(this.show) this.show=false
    }
  }
}
</script>

<style>
:root {
  --pd: 40px 30px 60px 35px; /* content*/
  --pd-sm : 20px 15px 30px 17px;
  --side-bar-width: 270px;
}
a {
  color: inherit;
}
body {
  margin: 0;
  font-size: 14px; /* root font size*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, '微軟正黑體';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555555;
}
.block {
  box-shadow: 1px 1px 3px gray;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  box-sizing: border-box;
}
.block>.inner-block {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.container{
  margin-right:var(--side-bar-width);
}
.content{
  width: 100%;
  overflow-x: scroll;
  box-sizing: border-box;
  padding: var(--pd);
}
.fixed-container {
  position: fixed;
  top: 0;
  right: 0;
  width: var(--side-bar-width);
  height: 100vh;
  background-color: #2c3e50;
}
.sidebar{
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  min-height: 100px;
  transform: translateY(-50%);
  box-sizing: border-box;
  color: white;
}
@media screen and (max-width: 768px){
  .container{
    width: 100vw;
    overflow-x: hidden;
    margin-right: 0px;
  } 
  .content {
    padding: var(--pd-sm);
  }
  .fixed-container{
    transition: 0.4s;
    z-index: 100;
    width: 100vw;
    transform: translateX(100%);
  }
  .fixed-container.show{
    transform: translateX(0%);
  }
  .my-header {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
}
</style>
