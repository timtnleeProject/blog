<template>
    <div>
      <loading :loaded="loaded"></loading>
      <div class="center-max-view">
        <div class="article" v-html="content"></div>
      </div>
      <div class="contact">
        <a v-for="info in settings.CONTACT" :key="info.src" :href="info.href" target="_blank">
          <img class="icon" :src="info.src" >
        </a>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import Loading from '../components/Loading.vue'

export default {
  components: {
    Loading
  },
  data: ()=>{
    return {
      content: '',
      loaded: false
    }
  },
  created() {
    this.getSource()
  },
  computed: {
    ...mapState({
      lists:'lists',
      settings: 'settings'
    })
  },
  methods: {
    getSource() {
      if(this.lists.about) {
        this.$get(`doc/${this.lists.about}.md`).then(res=>{
          this.content = this.$markdown.render(res)
          this.$nextTick(()=>{
            this.setLinksAttr()
            this.loaded = true
          })
        })
      }
    },
    setLinksAttr(){
      this.$el.querySelectorAll('a').forEach(el=>{
        el.setAttribute('target','_blank')
      })
      window.console.log('[App] set links attr.')
    },
  },
  watch: {
    lists () {
      this.getSource()
    }
  }
}
</script>

<style scoped>
.contact {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.contact > a {
  display: block;
  margin-left: 10px;
  width: 40px;
  height: 40px;
}
.contact > a>img {
  width: 100%;
  display: block;
}
</style>

