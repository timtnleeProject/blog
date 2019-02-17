<template>
  <div class="sidebar">
    <div class="title">{{settings.HEADER_TITLE}}</div>
    <small class="indent">{{settings.SIDEBAR_TEXT}}</small>
    <router-link v-for="r in routes" class="tx-light" :class="{active:r.path===$route.path}" :key="r.name" :to="r.path">
      <span class="tx">{{r.name}}</span>
    </router-link>
  </div> 
</template>

<script>
import Vue from 'vue'
import { mapState } from "vuex"

export default Vue.extend({
  data: ()=>{
    return {
      routes: [{
        name: 'Home',
        path: '/'
      },{
        name: 'Articles',
        path: '/search'
      },{
        name: 'About me',
        path: '/about'
      }]
    }
  },
  computed:{
    ...mapState({
      settings:'settings'
    })
  }
})
</script>

<style lang='scss' scoped>
@import 'Style';
.sidebar {
  padding-left: 16px;
  color: white;
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: nowrap;
  >a {
  opacity: 0.8;
  font-size: 1.1rem;
  text-decoration: none;
  text-align: left;
  }
  >a.active>span {
    border-left: 2px solid;
    padding-left: 5px;
  }
  >a:hover{
    opacity: 1;
  }
  >*+*{
    margin-top: 1rem;
  }
}
.title {
  color: white;
  padding-bottom: 5px;
  font-size: 1.3rem;
}
.indent {
  padding-left: 0.8rem;
  opacity: 0.6;
}
@media screen and (max-width: $lg){
  .sidebar{
    padding: 0;
    text-align: center;
  }
  .sidebar>a {
    text-align: center;
  }
}
</style>
