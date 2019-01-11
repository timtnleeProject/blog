<template>
  <div>
     <div v-html="content"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: ()=>{
    return {
      name: '',
      content: ''
    }
  },
  mounted(){
    this.name = this.$route.params.name
    window.console.log(`Fetch article "${this.name}"`)
    this.$get(`/doc/${this.name}.md`).then(res=>{
      this.content = this.$markdown.render(res)
    })
  },
  computed: mapState({
    previews: 'previews'
  })
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


