<template>
  <div class="center-max-view">
    <div>
      <banner></banner>
      <div v-if="pinned_previews.length>0">
        <h2 class="h tx-dark">{{settings.HOME_PINNED_ARTICLE_TEXT}}</h2>
        <my-previews :max="settings.HOME_MAX_PREVIEW" :previews="pinned_previews"></my-previews>
      </div>
      <div v-if="normal_previews.length>0">
        <h2 class="h tx-dark">{{settings.HOME_ARTICLE_TEXT}}</h2>
        <my-previews :max="settings.HOME_MAX_PREVIEW" :previews="normal_previews"></my-previews>
      </div>
      <router-link class="block last" to="/search">> more articles</router-link>
    </div>
  </div>
</template>

<script>
import MyPreviews from '../components/Previews.vue'
import Banner from '../components/Banner.vue'
import { mapState } from "vuex"

export default {
  components: {
    Banner,
    MyPreviews
  },
  computed: {
    pinned_previews(){
      return this.sorted_previews.filter(p=>p.pinned)
    },
    normal_previews(){
      return this.sorted_previews.filter(p=>!p.pinned)
    },
    sorted_previews(){
      return this.previews.slice().sort((a,b)=>b.date.getTime() - a.date.getTime())
    },
    ...mapState({
      previews: 'previews',
      settings:'settings'
    })
  }
}
</script>

<style scoped>
.last {
  padding: 10px;
  font-size: 1.2rem;
}
</style>


