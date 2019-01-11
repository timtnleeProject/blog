<template>
  <header class="header">
    <h1 class="title">{{settings.HEADER_TITLE}}</h1>
    <div class="subtitle">{{settings.HEADER_SUBTITLE}}</div>
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
  }
}
</script>

<style scoped>
.header {
  position: flex;
}
.title {
  padding: 10px 0px;
}
.subtitle {
  padding: 5px 0px;
  font-size: 14px;
}
</style>
