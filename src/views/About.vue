<template>
    <div class="center-max-view flex-col">
      <div class="article" v-html="content"></div>
      <div class="contact">
        <a v-for="info in settings.CONTACT" :key="info.src" :href="info.href" target="_blank">
          <img class="icon" :src="info.src" >
        </a>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  data: ()=>{
    return {
      content: '',
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
        })
      }
    }
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

