<template>
  <div class="sidebar">
    <div class="title">{{settings.HEADER_TITLE}}</div>
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

<style scoped>
.sidebar {
  padding-left: 16px;
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.title {
  color: white;
  padding-bottom: 5px;
  font-size: 1.3rem;
}
.sidebar>a {
  opacity: 0.8;
  font-size: 1.1rem;
  text-decoration: none;
  text-align: left;
}
.sidebar>a.active>span {
  border-left: 2px solid;
  padding-left: 5px;
}
.sidebar>a:hover{
  opacity: 1;
}
.sidebar>*+*{
  margin-top: 1rem;
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
