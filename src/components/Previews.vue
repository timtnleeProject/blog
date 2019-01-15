<template>
  <div>
    <h2>New articles</h2>
    <div v-for="(p,i) in previews" :key="`preview${i}`" class="preview block" @click="linkto(p.name)">
      <h3 class="title">{{p.title}}</h3>
      <div class="line">
        <div class="line">date: {{preview_dates[i]}}</div>
      </div>
      <div class="tags-container line">
        <div class="line">tags: </div>
        <div v-for="tag in lists.articles[p.name].tags" :key="`${p}-tag${tag}`" class="tag line">
          <div class="dot"></div>
          <div class="tag-name">{{tag}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  computed:{
    preview_dates(){
      return (this.previews)?this.previews.map(p=>{
        const d = p.date
        return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
      }):[]
    },
    ...mapState({
      previews: 'previews',
      lists:'lists'
    })
  } ,
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
  cursor: pointer;
  overflow: hidden;
}
.title{
  margin-block-end: 0.6em;
}
.preview>.cover {
  background-image: linear-gradient(to top, rgba(255,255,255,1),rgba(255,255,255,0.3),rgba(255,255,255,0));
}
.line {
  padding: 3px;
}
.tags-container {
  display: flex;
}
.tags-container>*+* {
  margin-left: 3px;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  margin-right: 5px;
}
.tag-name {
  margin-right: 5px;
}
.tag {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 50px 5px 5px 50px;
  padding: 5px;
  color: white;
  background-color: #0099CC;
}
</style>


