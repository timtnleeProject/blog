<template>
  <div class="center-max-view">
    <div>
      <banner></banner>
      <h2 class="h tx-dark">{{settings.HOME_ARTICLE_TEXT}}</h2>
      <my-previews :max="settings.HOME_MAX_PREVIEW"></my-previews>
      <router-link class="block last" to="/search">> more articles</router-link>
    </div>
  </div>
</template>

<script>
import MyPreviews from '../components/Previews.vue'
import Banner from '../components/Banner.vue'
import { mapState } from "vuex";

export default {
  components: {
    Banner,
    MyPreviews
  },
  computed: mapState({
    settings:'settings'
  })
}
</script>

<style scoped>
.h {
  border-width: 0px 0px 0px 3px;
  padding-left: 5px;
  border-style: solid;
}
.last {
  padding: 10px;
  font-size: 1.2rem;
}
</style>


