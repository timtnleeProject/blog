<template>
  <div>
    <div v-for="(p,i) in sorted_previews" :key="`preview${i}`" class="preview block" @click="linkto(p.name)">
      <h3 class="title">{{p.title}}</h3>
      <div class="prev-area block">
        <div class="plan-text line" v-html="p.content"></div>
        <div class="inner-block cover"></div>
      </div>
      <div class="line">
        <div class="line b">date: {{preview_dates[i]}}</div>
      </div>
      <div class="tags-container line">
        <div class="line b">tags: </div>
        <div v-for="tag in p.tags" :key="`${p}-tag${tag}`" class="tag line bg-special">
          <div class="dot"></div>
          <div class="tag-name">{{tag}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props:['max'],
  computed:{
    preview_dates(){
      return (this.sorted_previews)?this.sorted_previews.map(p=>{
        const d = p.date
        return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
      }):[]
    },
    sorted_previews(){
      return this.previews.slice().sort((a,b)=>b.date.getTime() - a.date.getTime()).slice(0,this.max)
    },
    ...mapState({
      previews: 'previews',
      lists:'lists',
      settings: 'settings'
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
.prev-area>.cover {
  background-image: linear-gradient(to top, rgba(255,255,255,0.8),rgba(255,255,255,0.1),rgba(255,255,255,0));
}
.preview {
  border-bottom: 1px solid lightgray;
}
.plan-text {
  overflow: hidden;
  max-height: 3.8rem;
}
.line {
  padding: 3px;
  font-size: 0.86rem;
}
.tags-container {
  display: flex;
}
.tags-container>*+* {
  margin-left: 3px;
}
.dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: white;
  margin-right: 5px;
}
.tag-name {
  margin-right: 5px;
}
.tag {
  font-size: 0.86rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 50px 5px 5px 50px;
  padding: 3px 5px;
  color: white;
}
.tag:hover>.tag-name {
  text-decoration: underline;
}
</style>


