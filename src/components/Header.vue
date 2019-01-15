<template>
  <header class="header">
    <h2 class="title" @click="toHome" :style="{color:settings.COLOR_DARK}">{{settings.HEADER_TITLE}}</h2>
    <div class="subtitle" :style="{color:settings.COLOR_SUB}">{{settings.HEADER_SUBTITLE}}</div>
    <div class="hamburger" @click="toggleBar($event)">
      <img class="icon" src="icons/ham.png" alt="">
    </div>
  </header>
</template>

<script>
export default {
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
  z-index: 10;
}
.hamburger {
  cursor: pointer;
  display: none;
  margin-right: 10px;
}
.hamburger>.icon{
  width: 100%;
  height: 100%;
}
.title {
  margin: 0px 10px;
  cursor: pointer;
}
.subtitle {
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
    font-size: 1.7rem;
    padding: 0px;
    flex: 1 1 0;
  }
  .subtitle {
    display: none;
  }
  .hamburger {
    display: block;
    flex: 0 0 2rem;
    width: 2rem;
    height: 2rem;
  }
}
</style>
