<template>
  <header class="header">
    <h2 class="title" @click="toHome">{{settings.HEADER_TITLE}}</h2>
    <div class="subtitle">{{settings.HEADER_SUBTITLE}}</div>
    <hamburger class="hamburger" @click.native="toggleBar($event)"></hamburger>
  </header>
</template>

<script>
import Hamburger from './Hamburger.vue'

export default {
  components: {
    Hamburger
  },
  data: ()=>{
    return {
    }
  },
  computed: {
    settings(){
      return this.$store.state.settings
    }
  },
  methods: {
    toHome(){
      this.$router.push('/')
    },
    toggleBar(e){
      e.stopPropagation()
      this.$emit('toggleBar')
    }
  }
}
</script>

<style scoped>
.header {
  box-sizing: border-box;
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: -2px 1px 3px #777777;
  font-family: 'Times New Roman', Times, serif;
  z-index: 10;
}
.hamburger {
  display: none;
  margin-right: 10px;
}

.title {
  margin: 0px 10px;
  padding: 5px;
  cursor: pointer;
}
.subtitle {
  padding: 5px;
  font-size: 1.1rem;
}
@media screen and (max-width: 992px){
  .header {
    height: 50px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .title {
    font-size: 1.5rem;
    padding: 0px;
    flex: 1 1 0;
  }
  .subtitle {
    display: none;
  }
  .hamburger {
    display: flex;
    flex: 0 0 1.8rem;
    height: 1.8rem;
  }
}
</style>
