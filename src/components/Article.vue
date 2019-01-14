<template>
  <div>
     <div class="article" v-html="content"></div>
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
    window.console.log(`[Fetch] fetch article "${this.name}"`)
    this.$get(`/doc/${this.name}.md`).then(res=>{
      this.content = this.$markdown.render(res)
      this.$nextTick(()=>{
        window.Prism.highlightAll()
        window.console.log('[Prism] syntax hightlight after fetching.')
        this.setLinksAttr()
        window.console.log('[App] set links attr.')
      })
    })
  },
  computed: mapState({
    previews: 'previews'
  }),
  methods: {
    setLinksAttr(){
      this.$el.querySelectorAll('a').forEach(el=>{
        el.setAttribute('target','_blank')
      })
    }
  }
}
</script>

<style scoped>
</style>


