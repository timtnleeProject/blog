<template>
  <div class="sidebar" :style="link_style">
    <div class="title">{{settings.HEADER_TITLE}}</div>
    <router-link to="/">Home</router-link>
    <router-link to="/">Articles</router-link>
    <router-link to="/">Works</router-link>
    <router-link to="/">About me</router-link>
  </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from "vuex";

export default Vue.extend({
  data: ()=>{
    return {
      
    }
  },
  computed:{
    link_style(){
      return {
        color: this.settings.COLOR_LIGHT
      }
    },
    ...mapState({
      settings:'settings'
    })
  }
})
</script>

<style scoped>
.sidebar {
  padding-left: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.title {
  color: white;
  padding-bottom: 5px;
  font-size: 1.5rem;
}
.sidebar>a {
  opacity: 0.8;
  font-size: 1.3rem;
  text-decoration: none;
}
.sidebar>a:hover{
  opacity: 1;
}
.sidebar>*+*{
  margin-top: 1rem;
}
@media screen and (max-width: 768px){
  .sidebar{
    padding: 0;
    text-align: center;
  }
}
</style>
