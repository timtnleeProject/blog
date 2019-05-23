<template>
  <div id="app">
    <my-header class="my-header bg-main tx-light" @toggleBar="toggleSideBar"></my-header>
    <div class="container" :style="stickyPolyfill()">
      <loading :loaded="loaded"></loading>
      <router-view class="content"></router-view>
      <my-footer></my-footer>
    </div>
    <div class="fixed-container bg-dark" :class='{show:show}' @click="closeSideBar">
      <my-sidebar class="sidebar bg-dark"></my-sidebar>
      <a class="bottom bandage" href="https://github.com/timtnleeProject/vuejs-static-blog" target="_blank">vuejs-static-blog</a>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/Header.vue'
import MySidebar from './components/Sidebar.vue'
import MyFooter from './components/Footer.vue'
import Loading from './components/Loading.vue'

export default {
  name: 'app',
  data: () => {
    return {
      show: false,
      loaded: false
    }
  },
  components: {
    MyHeader,
    MyFooter,
    MySidebar,
    Loading
  },
  created () {
    window.console.log('[Init] Get articles\' previews')
    const setSettings = this.$get('./setting.json').then(res => {
      this.$store.commit('setSettings', JSON.parse(res))
    })
    const setLists = this.$get('./list.json').then(res => {
      this.$store.commit('setLists', JSON.parse(res))
    })
    Promise.all([setSettings, setLists]).then(() => {
      this.$getTags()
      return this.$getPreviews(this.$store.state.settings.HOME_MAX_PREVIEW)
    }).then(() => {
      this.loaded = true
    })
  },
  methods: {
    stickyPolyfill () {
      return ((!window.CSS || !CSS.supports('position', 'sticky')) ? { marginTop: '60px' } : {})
    },
    toggleSideBar () {
      this.show = !this.show
    },
    closeSideBar () {
      if (this.show) this.show = false
    }
  }
}
</script>

<style lang="scss">
@import "Style";
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
@media screen and (max-width:$lg) and (min-width: $md){
  body {
    font-size: 15px;
  }
}

@media screen and (min-width: $lg) {
  body {
    font-size: 16px;
  }
}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444444;
}
.block {
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
  margin-right:$side-bar-width;
}
.content{
  width: 100%;
  min-height: 95vh;
  /* overflow-x: scroll; */
  box-sizing: border-box;
  // padding: $pd;
}
.fixed-container {
  position: fixed;
  top: 0;
  right: 0;
  width: $side-bar-width;
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
.bottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.bandage {
  display: inline-block;
  padding: 3px;
  font-size: 0.86rem;
  color: white;
  opacity: 0.6;
}
// .view-fade-enter-active,
// .view-fade-leave-active {
//   transition: opacity .2s ease;
// }
// .view-fade-enter, .view-fade-leave-to{
//   opacity: 0;
// }
@media screen and (max-width: $lg){
  .container{
    width: 100%;
    overflow-x: hidden;
    margin: 0px;
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
    position: fixed;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
}
</style>
