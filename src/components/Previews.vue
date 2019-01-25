<template>
  <div>
    <div v-for="(p,i) in previews_cut" :key="`preview${i}`" class="preview" @click="linkto({path:`/article/${p.name}`})">
      <div class="prev-img">
        <img :src="p.image||settings.DEFAULT_PREVIEW_IMAGE" alt="not found">
      </div>
      <div class="prev-art">
        <h3 class="title b">{{p.title}}<img v-if="p.pinned" class="pinned" src="icons/pinned.png"></h3>
        <div class="prev-area block">
          <div class="plan-text line" v-html="p.content"></div>
            <div class="inner-block line">
            <div class="cover"></div>
          </div>
        </div>
        <div class="line">
          <div class="line b">date: {{preview_dates[i]}}</div>
        </div>
        <div class="tags-container line">
          <div class="line b">tags: </div>
          <tag v-for="tag in p.tags" :key="tag" :tag="tag" class="line"></tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tag from './Tag.vue'

export default {
  props:['max','previews'],
  components: {
    Tag
  },
  computed:{
    preview_dates(){
      return (this.previews)?this.previews.map(p=>{
        const d = p.date
        return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
      }):[]
    },
    previews_cut() {
      return this.previews.slice(0,this.max)
    },
    ...mapState({
      lists:'lists',
      settings: 'settings'
    })
  } ,
  methods: {
    linkto(route){
      this.$router.push(route)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Style';
.preview {
  width: 100%;
  height: $preview-height;
  cursor: pointer;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
  .prev-img {
    flex: 0 0 $preview-height;
    height: 100%;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .prev-art {
    flex: 1 0 0;
  }
}
@media screen and (max-width:$md) {
  .prev-img {
    display: none;
  }
}
.preview:hover {
  border-bottom: 1px solid gray;
}

.prev-art {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 10px;
  >*:not(.prev-area) {
    flex-shrink: 0;
  }
  .prev-area {
    flex-shrink: 1;
    overflow: hidden;
  }
}
.title{
  margin-block-end: 0.6em;
}
.prev-area {
  margin: 10px;
  padding-right: 20px;
}
.prev-area .cover {
  width: 100%;
  height: 100%;
  position: relative;
  top:0;
  left: 0;
  background-image: linear-gradient(to top, rgba(255,255,255,1),rgba(255,255,255,0.5),rgba(255,255,255,0),rgba(255,255,255,0));
}
.line {
  padding: 3px;
  font-size: 0.86rem;
}
</style>


