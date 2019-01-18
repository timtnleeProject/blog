import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    previews: [],
    tags: [],
    lists: {},
    settings: {}
  },
  mutations: {
    setPreviews (state, payload) {
      state.previews = payload
    },
    setTags(state, payload) {
      state.tags = payload
    },
    setLists (state, payload) {
      state.lists = payload
    },
    setSettings (state, payload) {
      state.settings = payload
    }
  }
})

export default store