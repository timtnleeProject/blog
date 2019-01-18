<template>
  <div class="center-max-view">
    <div>
      <h3 class="h">Search</h3>
      <div class="row tags-container filter">
        <div>rule:</div>
        <div class="icon date-filter tx-main" @click="()=>desc=!desc">
          <div class="tri" :class="{desc:desc}"></div>
          <div>date</div>
        </div>
        <div class="icon tx-main" @click="switch_cond">
        {{this.condition}}
        </div>
      </div>
      <div class="row tags-container">
        <div>selected:</div>
        <div class="tag default-tag" v-if="select_tag_count===0">click tags below to filter</div>
        <div v-for="tag in sorted_selected_tags" :key="tag" class="tag" @click="unselect_tag(tag)">
          <div class="dot"></div>
          <div class="tag-name">{{tag}}</div>
          <img class="cancel" src="icons/cancel.png" alt="not found">
        </div>
      </div>
      <div class="row tags-container">
        <div>tags:</div>
        <div v-for="tag in sorted_tags" :key="tag" class="tag light" @click="select_tag(tag)" :class="{selected:selected_tags[tag]}">
          <div class="dot"></div>
          <div class="tag-name">{{tag}}</div>
        </div>
      </div>
      <h3 class="h">Articles</h3>
      <previews :previews="filtered_previews" :max="filtered_previews.length"></previews>
    </div>
  </div>
</template>

<script>
import Previews from "../components/Previews.vue"
import { mapState } from "vuex"

export default {
  beforeRouteUpdate(to,_,next) {
    const tag = to.query.tag
    this.selected_tags = {}
    if(tag) this.$set(this.selected_tags,tag, true)
    next()
  },
  created(){
    const tag = this.$route.query.tag
    if(tag) this.$set(this.selected_tags,tag, true)
  },
  data: () => {
    return {
      desc: true,
      selected_tags: {},
      condition: "OR"
    }
  },
  components: {
    Previews,
  },
  computed: {
    filtered_previews() {
      return this.previews
        .slice()
        .sort(
          (a, b) => (b.date.getTime() - a.date.getTime()) * (this.desc ? 1 : -1)
        )
        .filter(this.find_tags())
    },
    select_tag_count() {
      return Object.keys(this.selected_tags).length
    },
    sorted_tags() {
      return this.tags.slice().sort()
    },
    sorted_selected_tags() {
      const tags = []
      for (let tag in this.selected_tags) {
        tags.push(tag)
      }
      return tags.sort()
    },
    ...mapState({
      previews: "previews",
      tags: "tags"
    })
  },
  methods: {
    switch_cond(){
      if(this.condition==='OR') this.condition = 'AND'
      else this.condition = 'OR'
    },
    select_tag(tag) {
      this.$set(this.selected_tags, tag, true)
    },
    unselect_tag(tag) {
      this.$delete(this.selected_tags, tag)
    },
    find_tags() {
      if(this.select_tag_count===0) return ()=>true
      const or_filter = (prev)=>{
        const tags = prev.tags
        for (let tag of tags) {
          if (this.selected_tags[tag]) return true
        }
        return false
      }
      const and_filter = (prev)=>{
        const prev_tags = {}
        prev.tags.forEach(t => (prev_tags[t] = true))
        for (let tag in this.selected_tags) {
          if (!prev_tags[tag]) return false
        }
        return true
      }
      return (this.condition==='OR')?or_filter:and_filter
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px;
  border-bottom: 1px solid lightgray;
}
.filter > div {
  padding: 3px;
  box-sizing: border-box;
}
.icon {
  border-radius: 3px;
  margin-right: 5px;
  border: 1px solid;
  cursor: pointer;
  opacity: 0.7;
  min-width: 4em;
  text-align: center;
}
.icon {
   opacity: 1;
}
.light {
  opacity: 0.7;
}
.default-tag{
    cursor: auto;
}
.selected {
    opacity: 0.2;
}
.date-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  .tri {
    border-top: 0px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 8px solid;
    border-right: 5px solid transparent;
  }
  .tri.desc {
    transform: rotate(180deg);
  }
}
</style>


