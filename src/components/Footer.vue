<template>
  <footer class="footer" :style="footer_style">
    <div class="title">{{settings.FOOTER_TEXT}}</div>
  </footer>
</template>

<script>
export default {
  data: ()=>{
    return {
    }
  },
  computed: {
    footer_style(){
      return {
        backgroundColor: this.settings.COLOR_SUB,
        color: this.settings.COLOR_DARK
      }
    },
    settings(){
      return this.$store.state.settings
    }
  }
}
</script>

<style scoped>
.footer {
  padding: 1.5rem;
  position: flex;
}
.title {
  text-align: center;
  padding: 10px 0px;
  font-size: 16px;
}
</style>
