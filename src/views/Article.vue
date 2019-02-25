<template>
  <div @click="toggleMenu($event)">
    <loading :loaded="loaded"></loading>
    <div class="tree" :class="{show:show}">
      <ul class="expand-all" @click="expandToggle">{{(expand_all)?'expanded':'closed'}}</ul>
      <ul v-for="(h1, j) in tree" :key="`h1${h1.name}`" class="h1-list">
          <li :class="{on:j===h1idx}" @click="scrollTo(h1.link)">{{h1.name}}</li>
          <ul v-for="(h2, i) in h1.leaves" :key="`h2${h2.name}`" class="h2-list">
            <li :class="{on:i===h2idx}" @click="scrollTo(h2.link)">{{h2.name}}</li>
            <ul v-for="(h3,k) in h2.leaves" :key="`h3${h3.name}`" class="h3-list" :class="{expand:expand_all || i===h2idx}">
              <li :class="{on:i===h2idx&&k===h3idx}" @click="scrollTo(h3.link)">{{h3.name}}</li>
            </ul>
        </ul>
      </ul>
    </div>
    <div class="menu-bar" @click.stop="()=>show=!show"><span>menu</span></div>
    <div class="center-max-view">
      <div class="article-wrap">
        <div class="tags-container">
          <img v-if="pinned" src="icons/pinned.png" alt="" class="pinned">
          <div>tags: </div>
          <tag v-for="tag in tags" :key="tag" :tag="tag"></tag>
        </div>
        <div class="article" v-html="content" @click="zoomImg($event)"></div>
      </div>
    </div>
    <div class="zoomin" v-if="openZoom" @click="closeZoom($event)">
      <div class="hint">zoom and move image</div>
      <div class="wrap">
        <clipper-fixed class="clipper" :src="zoomSrc" :ratio="ratio" :zoomRate="0.08" :min-scale="0.7" :grid="false" border-color="rgba(0,0,0,0)" bg-color="white" shadow="rgba(0,0,0,0)"></clipper-fixed>
        <img class="cancel" src="icons/cancel.png" alt="" @click.stop="()=>openZoom=!openZoom">
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '../components/Tag.vue'
import Loading from '../components/Loading.vue'
import { mapState } from 'vuex'
import { clipperFixed } from "vuejs-clipper"

export default {
  components: {
    Tag,
    Loading,
    clipperFixed
  },
  data: ()=>{
    return {
      name: '',
      content: '',
      tree: [],
      loaded: false,
      scrollY: 0,
      expand_all: false,
      h1idx: -1,
      h2idx: -1,
      h3idx: -1,
      show: false,
      zoomSrc: 'images/issue/mail1.jpg',
      openZoom: false,
      ratio: 4/3
    }
  },
  created(){
    window.addEventListener('scroll',this.scroll)
  },
  destroyed(){
    window.removeEventListener('scroll', this.scroll)
  },
  mounted(){
    this.name = this.$route.params.name
    window.console.log(`[Fetch] fetch article "${this.name}"`)
    this.$get(`./doc/${this.name}.md`).then(res=>{
      this.content = this.$markdown.render(res)
      this.$nextTick(()=>{
        window.Prism.highlightAll()
        window.console.log('[Prism] syntax hightlight after fetching.')
        this.setLinksAttr()
        this.generateMenu()
        this.scroll()
        this.loaded = true
      })
    })
  },
  computed: {
    metadata() {
      return this.previews.find(prev=>prev.name===this.name)
    },
    tags() {
      return (this.metadata)?this.metadata.tags:[]
    },
    pinned() {
      return (this.metadata)?this.metadata.pinned:false
    },
    ...mapState({
      previews: 'previews'
    })
  },
  methods: {
    scroll(){
      this.scrollY = window.scrollY
      this.calcScrollPos()
    },
    calcScrollPos() {
      if(this.tree.length===0) return
      
      let sc_offset = this.getScrollOffset()
      let h1top,h2top,h3top
      let h1idx=-1,h2idx =-1,h3idx = -1
      const mappingTop = (h) => h.link.offsetTop - sc_offset
      h1top = this.tree.map(mappingTop)
      h1idx = this.getScrollIdx(h1top)
      if(h1idx!=-1 && this.tree[h1idx].leaves.length>0) {
        h2top = this.tree[h1idx].leaves.map(mappingTop)
        h2idx = this.getScrollIdx(h2top)
      }
      if(h2idx!=-1) {
        const leaf = this.tree[h1idx].leaves[h2idx]
        h3top = leaf.leaves.map(mappingTop)
        h3idx = this.getScrollIdx(h3top)
      }
      this.h1idx = h1idx
      this.h2idx = h2idx
      this.h3idx = h3idx
    },
    getScrollIdx(tops){
      let idx = tops.reduce((acc, curr) => acc + (this.scrollY+1>=curr) , 0)
      return Math.max(idx-1,0)
    },
    getScrollOffset() {
      return document.querySelector('.my-header').getBoundingClientRect().height
    },
    setLinksAttr(){
      this.$el.querySelectorAll('a').forEach(el=>{
        el.setAttribute('target','_blank')
      })
      window.console.log('[App] set links attr.')
    },
    generateMenu(){
      const tree = []
      /**
       * [{
       *   name: 'xx',
       *   leaves: []
       * }]
       */
      let depth = 1
      let indecator = tree
      this.$el.querySelectorAll("h1,h2,h3").forEach(el=>{
        const name = el.innerText
        const nodeName = el.nodeName
        const link = el
        if(nodeName==='H1') {
          if(depth != 1){
            indecator = tree
            depth = 1
          } 
          indecator.push({name, leaves:[], link})
        } else if(nodeName==='H2' && depth>0) {
          if(depth!= 2) {
            indecator = tree[tree.length-1]
            depth = 2
          }
          indecator.leaves.push({name, leaves:[], link})
        } else if(nodeName==='H3'&&depth>1) {
          if(depth!= 3) {
            const leaf = tree[tree.length-1].leaves
            indecator = tree[tree.length-1].leaves[leaf.length-1]
            depth = 3
          }
          indecator.leaves.push({name, link})
        }
      })
      this.tree = tree
      window.console.log('[App] generate menu.')
    },
    scrollTo(el){
      let sc_offset = this.getScrollOffset()
      window.scrollTo(0,el.offsetTop - sc_offset)
      this.scroll()
    },
    zoomImg(e){
      if (e.target.nodeName === 'IMG'){
        this.zoomSrc = e.target.src
        this.openZoom = true
      }
    },
    closeZoom(e){
      if (e.target.classList.contains('zoomin'))
        this.openZoom = false
    },
    toggleMenu(e){
      if(this.$el.querySelector('.tree').contains(e.target)) return
      if(this.show) this.show=false
    },
    expandToggle() {
      this.expand_all = !this.expand_all
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Style';
.article-wrap {
  overflow-x: scroll;
  display: block;
  margin-left:$tree-width;
}
.tree {
  position: fixed;
  top: 90px; /* header height + 10px*/
  left: 0;
  padding: 6px;
  z-index: 100;
  max-height: 80vh;
  box-sizing: border-box;
  width: $tree-width;
  overflow-y: scroll;
  overflow-x: hidden;
}
.menu-bar {
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  color: gray;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  z-index: 100;
  height: 30px;
  width: 50px;
  box-sizing: border-box;
  box-shadow: 1px 1px 1px gray;
  bottom: 20px;
  right: 20px;
}
.zoomin {
  z-index: 100;
  position: fixed;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100vh;
  .wrap {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: auto;
    max-height: 100vh;
    overflow: hidden;
    border-radius: 5px;
    width: 100%;
    max-width: 900px;
  }
  .hint {
    color: white;
    position: absolute;
    top: 5px;
    width: 100%;
    text-align: center;
  }
  .cancel {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
  }
  .clipper {
    width: 100%;
  }
}
@media screen and (max-width: $md){
  .tree {
    display: none;
    background-color: white;
    left: initial;
    top: initial;
    border: 1px solid gray;
    border-radius: 6px;
    box-shadow: inset 1px 1px 2px lightgray;
    right: 20px;
    bottom: 50px;
  }
  .tree.show{
    display: block;
  }
  .menu-bar {
    display: flex;
  }
  .article-wrap {
    margin-left: 0px;
  }
}
.expand-all {
  color: gray;
  cursor: pointer;
  opacity: 0.7;
}
.h3-list {
  display: none;
}
.h3-list.expand {
  display: block;
}
.on {
  font-weight: bold;
  color: black;
}

.tree {
  ul,li {
    font-size: 0.86rem;
    list-style: none;
    box-sizing: border-box;
  }
  ul {
    padding: 2px 10px;
  }
  li {
    cursor: pointer;
  }
}
</style>


