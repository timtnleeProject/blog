<template>
  <header class="header">
    <h1 class="title" @click="toHome">{{settings.HEADER_TITLE}}</h1>
    <div class="subtitle">{{settings.HEADER_SUBTITLE}}</div>
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
      return
      // this.$router.push('/')
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
  padding: 20px;
  background-color: white;
  box-shadow: -2px 1px 3px #777777;
  z-index: 10;
}
.hamburger {
  display: none;
}
.hamburger>.icon{
  width: 100%;
  height: 100%;
}
.title {
  padding: 10px 5px;
  /* cursor: pointer; */
}
.subtitle {
  padding: 5px 10px;
  font-size: 14px;
}
@media screen and (max-width: 768px){
  .header {
    padding: 10px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .title {
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
