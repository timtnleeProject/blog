<template>
  <div>
      {{$store.state.count}}
    <div v-for="(p,i) in previews" :key="`preview${i}`" class="preview block" @click="linkto(p.name)">
      <div class="md inner-block" v-html="p.content"></div>
      <div class="cover inner-block"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  computed: mapState({
    previews: 'previews'
  }),
  methods: {
    linkto(name){
      this.$router.push(`/article/${name}`)
    }
  }
}
</script>

<style scoped>
.preview {
  width: 100%;
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.preview>.md{
  padding: 5px;
  box-sizing: border-box;
}
.preview>.cover {
  background-image: linear-gradient(to top, rgba(255,255,255,1),rgba(255,255,255,0.3),rgba(255,255,255,0));
}
</style>


