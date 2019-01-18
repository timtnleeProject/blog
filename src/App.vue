<template>
  <div id="app">
    <my-header class="my-header bg-main tx-light" @toggleBar="toggleSideBar"></my-header>
    <div class="container">
      <loading :loaded="loaded"></loading>
      <router-view class="content"></router-view>
      <my-footer></my-footer>
    </div>
    <div class="fixed-container bg-dark" :class='{show:show}' @click="closeSideBar">
      <my-sidebar class="sidebar bg-dark"></my-sidebar>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/Header.vue'
import MySidebar from './components/Sidebar.vue'
import MyFooter from './components/Footer.vue'
import Loading from './components/Loading.vue'
import { mapState } from "vuex"

export default {
  name: 'app',
  data: ()=>{
    return {
      show: false,
      loaded: false,
    }
  },
  components: {
    MyHeader,
    MyFooter,
    MySidebar,
    Loading
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
      const table = {}
      const tags_map = {}
      const tag_lists = []
      const articles_names = this.lists.articles.map(a=>{ 
        table[a.name] = {//transform mapping table
          date: a.date,
          tags: a.tags
        }
        return a.name
      })
      this.$getArticles(articles_names).then(raws=>{
        this.$store.commit('setPreviews',raws.map(r=>{
          const content_ary = r.content.split('\n').filter(str=>str.trim()!="")
          const paragraph =  content_ary.slice(1, 1+this.settings.PREVIEW_LINE).join('\n')
          const tags = table[r.name].tags
          tags.forEach(tag=>{
            if(!tags_map[tag]){
              tags_map[tag] = true
              tag_lists.push(tag)
            } 
          })
          return {
            name: r.name,
            content: this.$markdown.render(paragraph)+ '</br>',
            date: new Date(table[r.name].date),
            tags: tags.sort(),
            title: content_ary[0].slice(-(content_ary[0].length-2))
          }
        }))
        this.$store.commit('setTags', tag_lists)
        this.loaded = true
      })
    })
  },
  computed: {
    ...mapState({
      settings: 'settings',
      lists: 'lists'
    })
  },
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
:root{
  --pd: 40px 30px 60px 80px; /* content*/
  --pd-sm : 20px 15px 30px 17px; /* mobile*/
  --side-bar-width: 240px;
  --tree-width: 230px;
  --max-view: 750px;
}
a {
  color: inherit;
}
.b {
  color: black;
}
body {
  margin: 0;
  font-size: 14px;
   -webkit-tap-highlight-color:rgba(255,0,0,0);
}
/* root font size*/
@media screen and (max-width:992px) and (min-width: 768px){
  body {
    font-size: 15px;
  }
}

@media screen and (min-width: 992px) {
  body {
    font-size: 16px;
  }
}

#app {
  font-family: 'Avenir', Arial, Helvetica, sans-serif, '微軟正黑體';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555555;
}
.block {
  /* box-shadow: 1px 1px 3px gray; */
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
  /* overflow-x: scroll; */
  box-sizing: border-box;
  padding: var(--pd);
}
.fixed-container {
  position: fixed;
  top: 0;
  right: 0;
  width: var(--side-bar-width);
  height: 100vh;
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
.my-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
@media screen and (max-width: 992px){
  .container{
    width: 100%;
    overflow-x: hidden;
    margin: 0px;
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
