<template>
  <div class="banner">
    <h3 class="quote tx-main">{{settings.QUOTE}}</h3>
    <img src="images/default/bird on water.jpg" alt="" srcset="">
  </div>
</template>

<script>
export default {
  computed: {
    settings() {
      return this.$store.state.settings
    }
  }
}
</script>

<style scoped>
.banner img{
  width: 100%;
  display: block;
}
.quote {
  font-weight: lighter;
  font-style: italic;
  /* padding: 20px;
  font-size: 1.5rem; */
}
</style>


