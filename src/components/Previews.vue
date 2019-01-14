<template>
  <div>
    <div class="title">Newest articles</div>
    <div v-for="(p,i) in previews" :key="`preview${i}`" class="preview block" @click="linkto(p.name)">
      <div class="md article">
        <h3>{{p.title}}</h3>
      </div>
      <div>
        <div class="line">date: {{preview_dates[i]}}</div>
      </div>
      <div class="tags-container">
        <div class="line">tags: </div>
        <div v-for="tag in lists.articles[p.name].tags" :key="`${p}-tag${tag}`" class="tag line">
          {{tag}}
        </div>
      </div>
      <!-- <div class="cover inner-block"></div> -->
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
  /* min-height: 200px; */
  /* max-height: 210px; */
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
.line {
  padding: 3px;
}
.tags-container {
  display: flex;
}
.tags-container>*+* {
  margin-left: 3px;
}
.tag {
  border: 1px solid blueviolet;
  border-radius: 5px;
  color: blueviolet;
}
</style>


