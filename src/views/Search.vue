<template>
  <div class="center-max-view">
    <div>
      <div class="search-bar tx-main" v-if="fixed" @click="toTop">
        <div>search bar</div>
        <div class="tri"></div>
      </div>
      <div class="search-area">
        <h3 class="h">Search</h3>
        <div class="row tags-container">
          <div>title:</div>
          <div class="input-wrap">
            <input type="text" class="search-input" v-model="search_title">
            <img src="icons/cancel.png" alt @click="()=>{search_title=''}">
          </div>
        </div>
        <div class="row tags-container">
          <div>tags rule:</div>
          <div class="icon date-filter tx-main" @click="()=>desc=!desc">
            <div class="tri" :class="{desc:desc}"></div>
            <div>date</div>
          </div>
          <div class="icon tx-main" @click="switch_cond">{{this.condition}}</div>
        </div>
        <div class="row tags-container">
          <div>selected:</div>
          <div class="tag default-tag" v-if="select_tag_count===0">click tags below to filter</div>
          <div
            v-for="tag in sorted_selected_tags"
            :key="tag"
            class="tag"
            @click="unselect_tag(tag)"
          >
            <div class="dot"></div>
            <div class="tag-name">{{tag}}</div>
            <img class="cancel" src="icons/cancel.png" alt="not found">
          </div>
        </div>
        <div class="row tags-container">
          <div>tags:</div>
          <div
            v-for="tag in sorted_tags"
            :key="tag"
            class="tag light"
            @click="select_tag(tag)"
            :class="{selected:selected_tags[tag]}"
          >
            <div class="dot"></div>
            <div class="tag-name">{{tag}}</div>
          </div>
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
  beforeRouteUpdate(to, _, next) {
    this.query_tags = to.query
    next()
  },
  created(){
    this.query_tags = this.$route.query
    window.addEventListener('scroll',this.scroll)
  },
  mounted(){
    this.scroll()
  },
  destroyed(){
    window.removeEventListener('scroll', this.scroll)
  },
  data: () => {
    return {
      desc: true,
      query_tags: {},
      search_title: "",
      condition: "OR",
      fixed: false,
    }
  },
  components: {
    Previews
  },
  computed: {
    selected_tags() {
      //check query tags exist in available tags
      const exist = {}
      for (let t in this.query_tags) {
        if (this.tags.indexOf(t) != -1) exist[t] = true
      }
      return exist
    },
    filtered_previews() {
      return this.previews
        .slice()
        .filter(this.find_title())
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
    switch_cond() {
      if (this.condition === "OR") this.condition = "AND"
      else this.condition = "OR"
    },
    select_tag(tag) {
      const query = {}
      query[tag] = true
      this.$router.push({
        path: "/search",
        query: Object.assign(query, this.selected_tags)
      })
    },
    unselect_tag(tag) {
      const query = Object.assign({}, this.selected_tags)
      delete query[tag]
      this.$router.push({
        path: "/search",
        query
      })
    },
    find_title() {
      if (this.search_title.trim() === "") return () => true // if no title search, find all
      return prev => {
        const words = this.search_title.split(" ").filter(word => word != "")
        for (let word of words) {
          if (prev.title.toLowerCase().indexOf(word.toLowerCase()) != -1)
            return true
        }
        return false
      }
    },
    find_tags() {
      if (this.select_tag_count === 0) return () => true // if no tags selected, find all
      const or_filter = prev => {
        const tags = prev.tags
        for (let tag of tags) {
          if (this.selected_tags[tag]) return true
        }
        return false
      }
      const and_filter = prev => {
        const prev_tags = {}
        prev.tags.forEach(t => (prev_tags[t] = true))
        for (let tag in this.selected_tags) {
          if (!prev_tags[tag]) return false
        }
        return true
      }
      return this.condition === "OR" ? or_filter : and_filter
    },
    scroll() {
      const pos = this.$el.querySelector('.search-area').getBoundingClientRect()
      if(pos.bottom<0) this.fixed = true
      else this.fixed = false
    },
    toTop() {
      window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth' 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  position: fixed;
  margin: 0;
  padding: 10px 15px;
  top: 50px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 2px;
  cursor: pointer;
  .tri {
    border-top: 0px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: 10px solid;
    border-right: 7px solid transparent;
    margin-left: 5px;
  }
}
.row {
  padding: 10px;
  border-bottom: 1px solid lightgray;
}
.icon {
  border-radius: 3px;
  margin-right: 5px;
  border: 1px solid;
  padding: 3px;
  box-sizing: border-box;
  cursor: pointer;
  opacity: 0.7;
  min-width: 4em;
  text-align: center;
}
.icon {
  opacity: 1;
}
.input-wrap {
  position: relative;
  img {
    position: absolute;
    display: block;
    width: 1rem;
    height: 1rem;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
.search-input {
  box-sizing: border-box;
  width: 100%;
  max-width: 180px;
  padding: 6px 1.5rem 6px 6px;
  border-radius: 5px;
  border: 1px solid var(--color-sub);
  box-shadow: inset 1px 1px 3px #cccccc;
}
.search-input:focus{
  outline: none;
}
.light {
  opacity: 0.7;
}
.default-tag {
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


