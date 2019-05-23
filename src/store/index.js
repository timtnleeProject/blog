import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    previews: [],
    tags: [],
    lists: {},
    settings: {},
    tags_count: {}
  },
  mutations: {
    setPreviews (state, payload) {
      state.previews = payload
    },
    addPreviews (state, payload) {
      state.previews = state.previews.concat(payload)
    },
    setTags (state, payload) {
      state.tags = payload
    },
    setLists (state, payload) {
      state.lists = payload
    },
    setSettings (state, payload) {
      state.settings = payload
    },
    setTagsCount (state, payload) {
      state.tags_count = payload
    }
  }
})

export default store
