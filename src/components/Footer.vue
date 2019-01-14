<template>
  <footer class="footer">
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
    settings(){
      return this.$store.state.settings
    }
  }
}
</script>

<style scoped>
.footer {
  position: flex;
}
.title {
  text-align: center;
  padding: 10px 0px;
  font-size: 16px;
}
</style>
